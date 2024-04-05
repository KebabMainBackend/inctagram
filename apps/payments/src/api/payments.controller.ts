import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { stripeCheckoutCommand } from "./use-cases/stripe-checkout-command";
import { stripeCreateProductCommand } from "./use-cases/stripe-create-product-command";

@Controller('payments')
export class PaymentsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('stripe/checkout')
  async stripeCheckout(@Body() command: stripeCheckoutCommand) {
    return this.commandBus.execute(command)
  }

  @Post('stripe/add-new')
  async stripeAddNewProduct(@Body() command: stripeCreateProductCommand) {
    return this.commandBus.execute(command)
  }

}
