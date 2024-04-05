import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { addNewSubscriptionTypeDto } from "../../../../inctagram/src/features/stripe/api/dto";
import Stripe from "stripe";
import process from "process";

@CommandHandler(stripeUpdateAutoRenewalCommand)
export class stripeUpdateAutoRenewalCommand implements ICommandHandler<stripeUpdateAutoRenewalCommand> {
  constructor(
    public stripeSubscriptionId: string,
    public autoRenewal: boolean
  ) {}

  async execute(command: stripeUpdateAutoRenewalCommand): Promise<any> {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const {stripeSubscriptionId, autoRenewal} = command

    await stripe.subscriptions.update(stripeSubscriptionId,
      {
        cancel_at_period_end: !autoRenewal,
        metadata: {
          key: process.env.STRIPE_API_KEY
        }
      })
  }
}