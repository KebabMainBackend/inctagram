import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SubscriptionRepository } from "../../../db/subscription.repository";
import { StripeAdapter } from "../../../common/adapters/stripe.adapter";
import { PaypalAdapter } from "../../../common/adapters/paypal.adapter";

export class FinishPaypalPaymentCommand {
  constructor(
    public body: any
  ) {}
}

@CommandHandler(FinishPaypalPaymentCommand)
export class FinishPaypalPaymentHandler
  implements ICommandHandler<FinishPaypalPaymentCommand>
{
  constructor(
    private subscriptionRepo: SubscriptionRepository,
    private paypalAdapter: PaypalAdapter,
  ) {}

  async execute(payload: FinishPaypalPaymentCommand) {
    console.log(payload.body.payload.resource);

    const data = payload.body.payload.resource
    const payer = data.payer

    const currentSubscription =
      await this.subscriptionRepo.getCurrentSubscriptionByEmail(payer.payer_info.email)

    console.log(currentSubscription);

    return {
      userId: currentSubscription.userId,
      email: payer.payer_info.email };
  }
}