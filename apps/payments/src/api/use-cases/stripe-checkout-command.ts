import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import Stripe from "stripe";
import process from "process";
import { addNewSubscriptionTypeDto } from "../../../../inctagram/src/features/stripe/api/dto";
import { ProductEntity } from "../../../../inctagram/src/features/stripe/domain/product.entity";
import { ProductsSchema } from "../../db/schemas/products.schema";

@CommandHandler(stripeCheckoutCommand)
export class stripeCheckoutCommand implements ICommandHandler<stripeCheckoutCommand> {
  constructor(
    public productInfo: ProductEntity,
    public userId: string,
    public payload: addNewSubscriptionTypeDto
  ) {}

  async execute(command: stripeCheckoutCommand): Promise<any> {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const {productPriceId, userId,
            newSubscription, currentSubscription,
            renewSubscriptionData} = command

    const session =
      await stripe.checkout.sessions.create({
        success_url: 'http://localhost:3000/api/v1/stripe/success',
        cancel_url: 'http://localhost:3000/api/v1/stripe/canceled',
        line_items: [
          {
            price: productPriceId,
            quantity: 1
          },
        ],
        mode: 'payment',
        metadata: {
          userId: String(userId),
          newSubscription: JSON.stringify(newSubscription),
          currentSubscription: JSON.stringify(currentSubscription),
          renewSubscriptionData: JSON.stringify(renewSubscriptionData),
        },
      });

    return session
  }
}