import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AddNewSubscriptionTypeDto } from '../../../../../payments/src/api/dto/product.dto';
import { ApiExcludeController } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsMicroserviceMessagesEnum } from '../../../../../../types/messages';
import { ChangeAccountTypeAndSendMessageCommand } from '../application/use-cases/finish-payment.command';
import { CommandBus } from '@nestjs/cqrs';
import { firstValueFrom } from 'rxjs';
import { createPaypalWebhook } from './dto/dto';

@Controller('payments')
@ApiExcludeController()
export class PaymentsController {
  constructor(
    @Inject('PAYMENTS_SERVICE') private clientProxy: ClientProxy,
    private commandBus: CommandBus,
  ) {}
  @Post('stripe/create-product')
  async addNewProductToStripe(@Body() payload: AddNewSubscriptionTypeDto) {
    const data = this.clientProxy.send(
      { cmd: PaymentsMicroserviceMessagesEnum.STRIPE_CREATE_PRODUCT },
      { payload },
    );
    console.log(data);
    return data;
  }

  @Post('paypal/create-product')
  async addNewProductToPaypal(@Body() payload: AddNewSubscriptionTypeDto) {
    const data = this.clientProxy.send(
      { cmd: PaymentsMicroserviceMessagesEnum.PAYPAL_CREATE_PRODUCT },
      { payload },
    );

    return data;
  }

  @Post('stripe/webhook')
  async paymentInfo(@Req() req: RawBodyRequest<Request>) {
    const signature = req.headers['stripe-signature'];
    const rawBody = req.rawBody;
    const data = await firstValueFrom(
      this.clientProxy.send(
        { cmd: PaymentsMicroserviceMessagesEnum.STRIPE_FINISH_PAYMENT },
        { signature, rawBody },
      ),
    );
    return this.commandBus.execute(
      new ChangeAccountTypeAndSendMessageCommand(data.userId, data.email),
    );
  }

  @Post('paypal/webhook')
  @HttpCode(200)
  async paypalPaymentInfo(@Body() payload: any) {
    const data = await firstValueFrom(
      this.clientProxy.send(
        { cmd: PaymentsMicroserviceMessagesEnum.PAYPAL_FINISH_PAYMENT },
        { payload },
      ),
    );

    return this.commandBus.execute(
      new ChangeAccountTypeAndSendMessageCommand(data.userId, data.email),
    );
  }

  @Post('paypal/create-webhook')
  async paypalCreateWebhook(@Body() payload: createPaypalWebhook) {
    await firstValueFrom(
      this.clientProxy.send(
        { cmd: PaymentsMicroserviceMessagesEnum.PAYPAL_CREATE_WEBHOOK },
        { payload },
      ),
    );
  }

  @Get('success')
  stripeSuccess() {
    return 'Payment was successful!';
  }

  @Get('canceled')
  stripeCanceled() {
    return 'Transaction failed, please try again';
  }
}
