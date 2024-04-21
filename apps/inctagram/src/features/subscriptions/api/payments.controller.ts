import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { AddNewSubscriptionTypeDto } from '../../../../../payments/src/api/dto/product.dto';
import { ApiExcludeController } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsMicroserviceMessagesEnum } from '../../../../../../types/messages';
import { ChangeAccountTypeAndSendMessageCommand } from '../application/use-cases/finish-payment.command';
import { CommandBus } from '@nestjs/cqrs';
import { firstValueFrom } from 'rxjs';

@Controller('payments')
@ApiExcludeController()
// @UseGuards(BearerAuthGuard)
export class PaymentsController {
  constructor(
    @Inject('PAYMENTS_SERVICE') private clientProxy: ClientProxy,
    private commandBus: CommandBus,
  ) {}
  @Post('stripe/create-product')
  async addNewProductToStripe(@Body() payload: AddNewSubscriptionTypeDto) {
    return this.clientProxy.send(
      { cmd: PaymentsMicroserviceMessagesEnum.STRIPE_CREATE_PRODUCT },
      { payload },
    );
  }

  @Post('paypal/create-product')
  async addNewProductToPaypal(@Body() payload: AddNewSubscriptionTypeDto) {
    return this.clientProxy.send(
      { cmd: PaymentsMicroserviceMessagesEnum.PAYPAL_CREATE_PRODUCT },
      { payload },
    );
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
  async paypalPaymentInfo(@Body() payload: any) {
    console.log(1);
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

  @Get('success')
  stripeSuccess() {
    return 'Payment was successful!';
  }

  @Get('canceled')
  stripeCanceled() {
    return 'Transaction failed, please try again';
  }
}
