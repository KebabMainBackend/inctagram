import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SubscriptionEntity } from '../../db/domain/subscription.entity';
import { PurchaseSubscriptionDto } from '../../api/dto/subscription.dto';
import { ProductRepository } from '../../db/product.repository';
import { StripeAdapter } from '../../common/adapters/stripe.adapter';
import { SubscriptionRepository } from '../../db/subscription.repository';
import Stripe from 'stripe';
import { HttpException, HttpStatus } from "@nestjs/common";
import { incorrectProductIdMessage } from "../../errorsMessages";
import { PaypalAdapter } from "../../common/adapters/paypal.adapter";
import { PrismaService } from "../../prisma.service";

export class PurchaseSubscriptionCommand {
  constructor(
    public userId: number,
    public email: string,
    public payload: PurchaseSubscriptionDto,
    public paypalSubscriptionId: string | null
  ) {}
}

@CommandHandler(PurchaseSubscriptionCommand)
export class PurchaseSubscriptionHandler
  implements ICommandHandler<PurchaseSubscriptionCommand>
{
  constructor(
    private productRepository: ProductRepository,
    private subscriptionRepo: SubscriptionRepository,
    private stripeAdapter: StripeAdapter,
    private paypalAdapter: PaypalAdapter,
    private prisma: PrismaService,
  ) {}

  async execute({ userId, email, payload, paypalSubscriptionId }: PurchaseSubscriptionCommand) {
    // get stripeProductId and stripePriceId
    const productInfo = await this.productRepository.getProductInfo(
      payload.productPriceId,
    )

    if(!productInfo)
      throw new HttpException(incorrectProductIdMessage, HttpStatus.BAD_REQUEST)

    const currentSubscription =
      await this.subscriptionRepo.getCurrentSubscription(userId);

    const newSubscription = SubscriptionEntity.create(
      payload,
      productInfo,
      userId,
      paypalSubscriptionId,
    );

    const renewSubscriptionData = SubscriptionEntity.renewSubscription(
      currentSubscription
        ? currentSubscription.dateOfNextPayment
        : newSubscription.dateOfNextPayment,
      productInfo.period,
    );

    if(payload.paymentSystem === 'Stripe') {
      const session: Stripe.Response<Stripe.Checkout.Session> =
        await this.stripeAdapter.createPayment({
          userId,
          currentSubscription,
          renewSubscriptionData,
          newSubscription,
          productInfo,
        });
      return { url: session.url };
    } else {

      newSubscription.subscriptionStatus = 'Pending'

      await this.subscriptionRepo.addSubscriptionToDB(newSubscription)
      await this.subscriptionRepo.addPaymentToDB(
        'Paypal',
        productInfo,
        newSubscription.dateOfNextPayment,
        userId
      )

      const session =
        await this.paypalAdapter.createPayment({
          paypalPlanId: productInfo.paypalPlanId,
          newSubscription,
          email,
        });

      return { url: session.url };
    }
  }
}
