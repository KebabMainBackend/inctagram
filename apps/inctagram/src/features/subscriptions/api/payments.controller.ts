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

  @Post('stripe/webhook')
  paymentInfo(@Req() req: RawBodyRequest<Request>) {
    console.log(req, 'req');
    const signature = req.headers['stripe-signature'];
    const rawBody = req.rawBody;
    const data = this.clientProxy.send(
      { cmd: PaymentsMicroserviceMessagesEnum.STRIPE_FINISH_PAYMENT },
      { payload: { signature, rawBody } },
    );
    return this.commandBus.execute(
      new ChangeAccountTypeAndSendMessageCommand(4),
    );
    return data;
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
