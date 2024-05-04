import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StripeAdapter } from '../../../common/adapters/stripe.adapter';
import { SubscriptionRepository } from '../../../db/subscription.repository';

export class CreateStripeCustomerCommand {
  constructor(
    public userId: number,
    public email: string,
  ) {}
}

@CommandHandler(CreateStripeCustomerCommand)
export class CreateStripeCustomerHandler
  implements ICommandHandler<CreateStripeCustomerCommand>
{
  constructor(
    private subscriptionRepo: SubscriptionRepository,
    private stripeAdapter: StripeAdapter,
  ) {}

  async execute({ userId, email }: CreateStripeCustomerCommand) {
    let customer = await this.subscriptionRepo.getCurrentSubscription(userId);

    if (!customer.stripeCustomerId) {
      const newCustomer = await this.stripeAdapter.createCustomer(
        email,
        userId,
      );

      await this.subscriptionRepo.updateStripeCustomerId(
        userId,
        newCustomer.id,
      );
      customer = await this.subscriptionRepo.getCurrentSubscription(userId);
    }

    return customer;
  }
}
