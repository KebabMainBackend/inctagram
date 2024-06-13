import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StripeAdapter } from '../../../common/adapters/stripe.adapter';
import { SubscriptionRepository } from '../../../db/subscription.repository';
import { CreateSubscriptionDto } from '../../../api/dto/subscription.dto';
import { SubscriptionEntity } from '../../../db/domain/subscription.entity';
import { PaymentsEntity } from '../../../db/domain/payments.entity';

export class FinishStripePaymentCommand {
  constructor(
    public signature: string,
    public rawBody: Buffer,
  ) {}
}

@CommandHandler(FinishStripePaymentCommand)
export class FinishStripePaymentHandler
  implements ICommandHandler<FinishStripePaymentCommand>
{
  constructor(
    private subscriptionRepo: SubscriptionRepository,
    private stripeAdapter: StripeAdapter,
  ) {}

  async execute(payload: FinishStripePaymentCommand) {
    const data = await this.stripeAdapter.checkPayment(payload);
    if (data) {
      const metadata = data.data.metadata;
      const email = data.data.customer_details.email;

      const productInfo = JSON.parse(metadata.productInfo);
      const userId = +metadata.userId;

      const currentSubscription =
        await this.subscriptionRepo.getCurrentSubscription(userId);

      const subscriptionDto = CreateSubscriptionDto.createSubscriptionDto(
        productInfo,
        'Stripe',
        null,
        userId,
      );

      const subscription = SubscriptionEntity.create(subscriptionDto);
      const newSub = await this.subscriptionRepo.addSubscriptionToDB(
        subscription,
      );
      const payment = PaymentsEntity.create({
        paymentSystem: 'Stripe',
        productInfo,
        endDateOfSubscription: subscription.dateOfNextPayment,
        userId,
        subscriptionId: newSub.subscriptionId,
      });

      const renewSubscription = SubscriptionEntity.renewSubscription(
        currentSubscription
          ? currentSubscription.dateOfNextPayment
          : subscription.dateOfSubscribe,
        productInfo.period,
      );

      await this.subscriptionRepo.addPaymentToDB(payment);

      await this.subscriptionRepo.updateCurrentSubscription({
        userId,
        currentSubscription,
        dateOfNextPayment: renewSubscription.dateOfNextPayment,
        expireAt: renewSubscription.expireAt,
      });
      return { userId, email };
    }
  }
}
