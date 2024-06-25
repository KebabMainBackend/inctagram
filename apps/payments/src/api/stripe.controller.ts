import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { PaymentsMicroserviceMessagesEnum } from '../../../../types/messages';
import { AddNewSubscriptionTypeDto } from './dto/product.dto';
import { CreateStripeProductCommand } from '../application/use-cases/stripe/create-stripe-product.command';
import { FinishStripePaymentCommand } from '../application/use-cases/stripe/finish-stripe-payment.command';

@Controller()
export class StripeController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({
    cmd: PaymentsMicroserviceMessagesEnum.STRIPE_CREATE_PRODUCT,
  })
  async createProduct(data: { payload: AddNewSubscriptionTypeDto }) {
    return await this.commandBus.execute(
      new CreateStripeProductCommand(data.payload),
    );
  }

  @MessagePattern({
    cmd: PaymentsMicroserviceMessagesEnum.STRIPE_FINISH_PAYMENT,
  })
  async finishPayment(data: { signature: string; rawBody: any }) {
    return await this.commandBus.execute(
      new FinishStripePaymentCommand(data.signature, data.rawBody),
    );
  }
}
