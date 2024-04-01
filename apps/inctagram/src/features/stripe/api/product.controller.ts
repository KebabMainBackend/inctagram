import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { BearerAuthGuard } from '../../../auth/guards/bearer-auth.guard';
import { ProductRepository } from '../db/product.repository';
import { addNewSubscriptionTypeDto, makeAPurchaseDto } from './dto';
import { ApiExcludeController } from "@nestjs/swagger";
import { SubscriptionRepository } from "../../subscriptions/db/subscription.repository";

@Controller('stripe')
@ApiExcludeController()
// @UseGuards(BearerAuthGuard)
export class ProductController {
  constructor(private ProductRepository: ProductRepository,
              private SubscriptionRepository: SubscriptionRepository) {}
  @Post('create-product')
  async addNewProductToStripe(@Body() payload: addNewSubscriptionTypeDto) {
    return this.ProductRepository.addNewProductToStripe(payload);
  }

  @Post('webhook')
  paymentInfo(@Body() data) {

    const dataParsed = JSON.parse(JSON.stringify(data))

    if(dataParsed.type === 'checkout.session.completed') {
      const payload = JSON.parse(data.data.object.metadata.payload)
      const productInfo = JSON.parse(data.data.object.metadata.productInfo)

      return this.SubscriptionRepository
        .addSubscriptionToDB(
          payload,
          productInfo,
          Number(data.data.object.metadata.userId));
    }
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
