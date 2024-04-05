import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import Stripe from "stripe";
import process from "process";
import { addNewSubscriptionTypeDto } from "../../../../inctagram/src/features/stripe/api/dto";

@CommandHandler(stripeCreateProductCommand)
export class stripeCreateProductCommand implements ICommandHandler<stripeCreateProductCommand> {
  constructor(
    public payload: addNewSubscriptionTypeDto
  ) {}

  async execute(command: stripeCreateProductCommand): Promise<any> {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const { payload } = command

    const product =
      await stripe.products.create({
        name: payload.productName,
        description: payload.description
      });

    const priceDto = {
      unit_amount: payload.price * 100,
      currency: payload.currency,
      product: product.id,
    }

    const productPrice =
      await stripe.prices.create({ ...priceDto })

    const subscriptionPrice =
      await stripe.prices.create({
        ...priceDto,
        recurring: {
          interval: payload.interval,
        },
      })

    return {productPriceId: productPrice.id, subscriptionPriceId: subscriptionPrice.id}
  }
}