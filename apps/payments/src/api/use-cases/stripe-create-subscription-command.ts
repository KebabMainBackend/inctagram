import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { addNewSubscriptionTypeDto } from "../../../../inctagram/src/features/stripe/api/dto";
import Stripe from "stripe";
import process from "process";
import { ProductEntity } from "../../../../inctagram/src/features/stripe/domain/product.entity";
import { SubscriptionEntity } from "../../../../inctagram/src/features/subscriptions/domain/subscription.entity";

@CommandHandler(stripeCreateSubscriptionCommand)
export class stripeCreateSubscriptionCommand implements ICommandHandler<stripeCreateSubscriptionCommand> {
  constructor(
    public customerId: string,
    public autoRenewal: boolean,
    public subscription: SubscriptionEntity
  ) {}

  async execute(command: stripeCreateSubscriptionCommand): Promise<any> {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const { customerId, autoRenewal, subscription } = command

    return await stripe.subscriptions.create({
      customer: customerId,
      cancel_at_period_end: !autoRenewal,
      items: [{ price: subscription.subscriptionPriceId }],
      trial_end: Math.floor(subscription.dateOfNextPayment.getTime() / 1000)
    })
  }
}