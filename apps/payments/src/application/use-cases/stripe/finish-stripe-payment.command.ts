import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StripeAdapter } from '../../../common/adapters/stripe.adapter';
import { SubscriptionRepository } from '../../../db/subscription.repository';

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
      const currentSubscription =
        JSON.parse(metadata.currentSubscription) || null;
      const renewSubscription = JSON.parse(metadata.renewSubscriptionData);
      const newSubscription = JSON.parse(metadata.newSubscription);

      await this.subscriptionRepo.addSubscriptionToDB(newSubscription);

      await this.subscriptionRepo.updateCurrentSubscription({
        userId: +metadata.userId,
        currentSubscription,
        dateOfNextPayment: renewSubscription.dateOfNextPayment,
        expireAt: renewSubscription.expireAt,
      });
      return { userId: +metadata.userId, email };
    }
    return null;
  }
}
