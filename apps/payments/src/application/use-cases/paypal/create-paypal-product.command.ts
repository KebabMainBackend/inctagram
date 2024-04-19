import { AddNewSubscriptionTypeDto } from '../../../api/dto/product.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductRepository } from '../../../db/product.repository';
import { PaypalAdapter } from '../../../common/adapters/paypal.adapter';

export class CreatePaypalProductCommand {
  constructor(public payload: AddNewSubscriptionTypeDto) {}
}

@CommandHandler(CreatePaypalProductCommand)
export class CreatePaypalProductHandler
  implements ICommandHandler<CreatePaypalProductCommand>
{
  constructor(
    private productRepo: ProductRepository,
    private paypalAdapter: PaypalAdapter,
  ) {}

  async execute({ payload }: CreatePaypalProductCommand) {
    try {
      const paypalPlanId = await this.paypalAdapter.createProduct(payload);

      await this.productRepo.updateProduct(payload.period, paypalPlanId);
      return true;
    } catch (e) {
      console.log(e);
    }
  }
}
