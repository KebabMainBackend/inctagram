import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { addNewSubscriptionTypeDto } from "../../../../inctagram/src/features/stripe/api/dto";
import Stripe from "stripe";
import process from "process";

@CommandHandler(stripeCreateCustomerCommand)
export class stripeCreateCustomerCommand implements ICommandHandler<stripeCreateCustomerCommand> {
  constructor(
    public email: string,
    public userId: string
  ) {}

  async execute(command: stripeCreateCustomerCommand): Promise<any> {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    return await stripe.customers.create({
        email: command.email,
        metadata: {
          userId: command.userId,
        }
      })
  }
}