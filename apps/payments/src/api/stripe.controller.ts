import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { PaymentsMicroserviceMessagesEnum } from '../../../../types/messages';
import { AddNewSubscriptionTypeDto } from './dto/product.dto';
import { CreateStripeProductCommand } from '../application/use-cases/create-stripe-product.command';
import { FinishStripePaymentCommand } from '../application/use-cases/finish-stripe-payment.command';

@Controller()
export class StripeController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({
    cmd: PaymentsMicroserviceMessagesEnum.STRIPE_CREATE_PRODUCT,
  })
  async createProduct(data: { payload: AddNewSubscriptionTypeDto }) {
    return this.commandBus.execute(
      new CreateStripeProductCommand(data.payload),
    );
  }

  @MessagePattern({
    cmd: PaymentsMicroserviceMessagesEnum.STRIPE_FINISH_PAYMENT,
  })
  async finishPayment(data: { payload: any }) {
    return this.commandBus.execute(
      new FinishStripePaymentCommand(data.payload),
    );
  }
}
