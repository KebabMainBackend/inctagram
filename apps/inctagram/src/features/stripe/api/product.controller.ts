import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BearerAuthGuard } from '../../../auth/guards/bearer-auth.guard';
import { ProductRepository } from '../db/product.repository';
import { addNewSubscriptionTypeDto, makeAPurchaseDto } from './dto';

@Controller('stripe')
@UseGuards(BearerAuthGuard)
export class ProductController {
  constructor(private ProductRepository: ProductRepository) {}
  @Post('create-product')
  async addNewProductToStripe(@Body() payload: addNewSubscriptionTypeDto) {
    return this.ProductRepository.addNewProductToStripe(payload);
  }

  @Post('purchase')
  async makeAPurchase(@Body() payload: makeAPurchaseDto) {
    return this.ProductRepository.makeAPurchase(
      payload.priceId,
      payload.quantity,
    );
  }

  @Get('success')
  paymentSuccessfully() {
    return this.ProductRepository.stripeSuccess();
  }

  @Get('canceled')
  paymentCanceled() {
    return this.ProductRepository.stripeCanceled();
  }
}
