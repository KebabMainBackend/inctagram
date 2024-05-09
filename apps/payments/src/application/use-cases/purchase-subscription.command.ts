import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PurchaseSubscriptionDto } from '../../api/dto/subscription.dto';
import { ProductRepository } from '../../db/product.repository';
import { StripeAdapter } from '../../common/adapters/stripe.adapter';
import Stripe from 'stripe';
import { HttpException, HttpStatus } from '@nestjs/common';
import { incorrectProductIdMessage } from '../../errorsMessages';
import { PaypalAdapter } from '../../common/adapters/paypal.adapter';

export class PurchaseSubscriptionCommand {
  constructor(
    public userId: number,
    public email: string,
    public payload: PurchaseSubscriptionDto,
    public paypalSubscriptionId: string | null,
  ) {}
}

@CommandHandler(PurchaseSubscriptionCommand)
export class PurchaseSubscriptionHandler
  implements ICommandHandler<PurchaseSubscriptionCommand>
{
  constructor(
    private productRepository: ProductRepository,
    private stripeAdapter: StripeAdapter,
    private paypalAdapter: PaypalAdapter,
  ) {}

  async execute({ userId, payload }: PurchaseSubscriptionCommand) {
    const productInfo = await this.productRepository.getProductInfo(
      payload.productPriceId,
    );

    if (!productInfo)
      throw new HttpException(
        incorrectProductIdMessage,
        HttpStatus.BAD_REQUEST,
      );
    if (payload.paymentSystem === 'Stripe') {
      const session: Stripe.Response<Stripe.Checkout.Session> =
        await this.stripeAdapter.createPayment({
          userId,
          productInfo,
        });
      return { url: session.url };
    } else if (payload.paymentSystem === 'Paypal') {
      const session = await this.paypalAdapter.subscribeUser(
        userId,
        productInfo.paypalPlanId,
        false,
      );

      const sessionLink = session.links.find((obj) => obj.rel === 'approve');

      return { url: sessionLink.href };
    }
  }
}
