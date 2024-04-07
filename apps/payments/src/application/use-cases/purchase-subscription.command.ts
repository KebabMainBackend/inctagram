import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SubscriptionEntity } from '../../db/domain/subscription.entity';
import { PurchaseSubscriptionDto } from '../../api/dto/subscription.dto';
import { ProductRepository } from '../../db/product.repository';
import { StripeAdapter } from '../../common/adapters/stripe.adapter';
import { SubscriptionRepository } from '../../db/subscription.repository';
import Stripe from 'stripe';

export class PurchaseSubscriptionCommand {
  constructor(
    public userId: number,
    public payload: PurchaseSubscriptionDto,
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
  ) {}

  async execute({ userId, payload }: PurchaseSubscriptionCommand) {
    // get stripeProductId and stripePriceId
    const productInfo = await this.productRepository.getProductInfo(
      payload.productPriceId,
    );

    const currentSubscription =
      await this.subscriptionRepo.getCurrentSubscription(userId);

    const newSubscription = SubscriptionEntity.create(
      payload,
      productInfo,
      userId,
    );

    const renewSubscriptionData = SubscriptionEntity.renewSubscription(
      currentSubscription
        ? currentSubscription.dateOfNextPayment
        : newSubscription.dateOfNextPayment,
      productInfo.period,
    );

    const session: Stripe.Response<Stripe.Checkout.Session> =
      await this.stripeAdapter.createPayment({
        productPriceId: productInfo.productPriceId,
        userId,
        currentSubscription,
        renewSubscriptionData,
        newSubscription,
      });
    return { url: session.url };
  }
}
