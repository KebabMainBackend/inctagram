import { AddNewSubscriptionTypeDto } from '../../../api/dto/product.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { PaypalAdapter } from '../../../common/adapters/paypal.adapter';

export class CreatePaypalProductCommand {
  constructor(public payload: AddNewSubscriptionTypeDto) {}
}

@CommandHandler(CreatePaypalProductCommand)
export class CreatePaypalProductHandler
  implements ICommandHandler<CreatePaypalProductCommand>
{
  public token: string;
  constructor(
    private configService: ConfigService,
    private paypalAdapter: PaypalAdapter,
  ) {
    this.token = Buffer.from(
      `${this.configService.get('PAYPAL_CLIENT_ID')}:${this.configService.get(
        'PAYPAL_CLIENT_SECRET',
      )}`,
    ).toString('base64');
  }

  async execute({ payload }: CreatePaypalProductCommand) {
    try {
      console.log(payload);
      const product = await this.paypalAdapter.createProduct(
        payload.productName,
        payload.description,
      );

      return await this.paypalAdapter.createPlan(
        product,
        payload.interval,
        payload.price,
        payload.currency,
        payload.period,
      );
    } catch (e) {
      console.log(e);
    }
  }
}
