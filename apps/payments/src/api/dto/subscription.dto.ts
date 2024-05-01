import { IsBoolean, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Optional } from "@nestjs/common";
import { ProductEntity } from "../../db/domain/product.entity";

export class PurchaseSubscriptionDto {
  @IsString()
  @ApiProperty({
    name: 'productId',
  })
  productPriceId: string;
  @IsString()
  @ApiProperty({
    name: 'payment type',
    example: 'Paypal',
  })
  paymentSystem: 'Paypal' | 'Stripe';
}

export class UpdateAutoRenewalStatusDto {
  @IsInt()
  subscriptionId: number;
  @IsBoolean()
  autoRenewal: boolean;
}

export class CreateSubscriptionDto {
  @IsInt()
  userId: number
  @IsInt()
  price: number
  @IsInt()
  period: number
  @IsString()
  interval: 'day' | 'week' | 'month' | 'year';
  @IsString()
  paymentSystem: 'Stripe' | 'Paypal'
  @IsString()
  @Optional()
  paypalSubscriptionId: string | null
  @IsString()
  @Optional()
  productPriceId: string | null
  @IsString()
  @Optional()
  subscriptionPriceId: string | null
  constructor() {
  }

  static createSubscriptionDto(productInfo: ProductEntity,
                               paymentSystem: 'Stripe' | 'Paypal',
                               paypalSubscriptionId: string | null,
                               userId): CreateSubscriptionDto {
    return {
      price: productInfo.price,
      period: productInfo.period,
      interval: productInfo.interval,
      subscriptionPriceId: productInfo.subscriptionPriceId,
      productPriceId: productInfo.productPriceId,
      paypalSubscriptionId,
      paymentSystem,
      userId
    }
  }
}
