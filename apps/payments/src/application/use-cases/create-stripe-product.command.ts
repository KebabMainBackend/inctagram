import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StripeAdapter } from '../../common/adapters/stripe.adapter';
import { AddNewSubscriptionTypeDto } from '../../api/dto/product.dto';
import { ProductEntity } from '../../db/domain/product.entity';
import { ProductRepository } from '../../db/product.repository';

export class CreateStripeProductCommand {
  constructor(public payload: AddNewSubscriptionTypeDto) {}
}

@CommandHandler(CreateStripeProductCommand)
export class CreateStripeProductHandler
  implements ICommandHandler<CreateStripeProductCommand>
{
  constructor(
    private productRepo: ProductRepository,
    private stripeAdapter: StripeAdapter,
  ) {}

  async execute({ payload }: CreateStripeProductCommand) {
    //2
    try {
      const { productPrice, subscriptionPrice } =
        await this.stripeAdapter.createProduct(payload);
      const newProduct = ProductEntity.create({
        productPriceId: productPrice.id,
        subscriptionPriceId: subscriptionPrice.id,
        price: payload.price,
        period: payload.period,
        interval: payload.interval,
      });
      await this.productRepo.createProduct(newProduct);
      return true;
    } catch (e) {
      console.log(e);
    }
  }
}
