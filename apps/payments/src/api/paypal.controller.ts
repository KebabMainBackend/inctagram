import { Controller } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { MessagePattern } from "@nestjs/microservices";
import { PaymentsMicroserviceMessagesEnum } from "../../../../types/messages";
import { AddNewSubscriptionTypeDto } from "./dto/product.dto";
import { CreatePaypalProductCommand } from "../application/use-cases/paypal/create-paypal-product.command";
import { FinishStripePaymentCommand } from "../application/use-cases/stripe/finish-stripe-payment.command";
import { FinishPaypalPaymentCommand } from "../application/use-cases/paypal/finish-paypal-payment.command";

@Controller()
export class PaypalController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({
    cmd: PaymentsMicroserviceMessagesEnum.PAYPAL_CREATE_PRODUCT,
  })
  async addNewProductToPaypal(data: { payload: AddNewSubscriptionTypeDto }) {

    return await this.commandBus.execute(
      new CreatePaypalProductCommand(data.payload),
    );
  }

  @MessagePattern({
    cmd: PaymentsMicroserviceMessagesEnum.PAYPAL_FINISH_PAYMENT,
  })
  async paypalFinishPayment(payload: any) {
    return await this.commandBus.execute(
      new FinishPaypalPaymentCommand(payload),
    );
  }
}
