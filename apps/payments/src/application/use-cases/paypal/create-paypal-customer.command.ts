import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SubscriptionRepository } from "../../../db/subscription.repository";
import { StripeAdapter } from "../../../common/adapters/stripe.adapter";
import { PaypalAdapter } from "../../../common/adapters/paypal.adapter";

export class CreatePaypalCustomerCommand {
  constructor(
    public userId: number,
    public email: string,
  ) {}
}

@CommandHandler(CreatePaypalCustomerCommand)
export class CreatePaypalCustomerHandler
  implements ICommandHandler<CreatePaypalCustomerCommand>
{
  constructor(
    private subscriptionRepo: SubscriptionRepository,
    private paypalAdapter: PaypalAdapter,
  ) {}

  async execute({ userId, email }: CreatePaypalCustomerCommand) {
    let customer = await this.subscriptionRepo.getCurrentSubscription(userId);

    if (!customer) {
      const newCustomer = await this.paypalAdapter.createCustomer(
        email,
        userId,
      );
      await this.subscriptionRepo.updatePaypalCustomerId(userId, newCustomer.id);
      customer = await this.subscriptionRepo.getCurrentSubscription(userId);
    }

    return customer;
  }
}
