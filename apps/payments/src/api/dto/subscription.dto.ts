import { IsBoolean, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Optional } from "@nestjs/common";
import { ProductEntity } from "../../db/domain/product.entity";
import { SubscriptionEntity } from "../../db/domain/subscription.entity";


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
  @ApiProperty({
    description: 'subscription id',
    example: 1,
    required: true,
  })
  subscriptionId: number;
  @IsBoolean()
  @ApiProperty({
    description: 'auto renewal status',
    example: true,
    required: true,
  })
  autoRenewal: boolean;
}

export class CreateSubscriptionDto {
  @IsInt()
  userId: number
  @Optional()
  @IsInt()
  price?: number
  @IsInt()
  period: number;
  @IsString()
  interval: 'day' | 'week' | 'month' | 'year';
  @IsString()
  paymentSystem: 'Stripe' | 'Paypal';
  @IsString()
  @Optional()
  paypalSubscriptionId: string | null;
  @IsString()
  @Optional()
  productPriceId: string | null;
  @IsString()
  @Optional()
  subscriptionPriceId: string | null;
  constructor() {}

  static createSubscriptionDto(
    productInfo: ProductEntity,
    paymentSystem: 'Stripe' | 'Paypal',
    paypalSubscriptionId: string | null,
    userId,
  ): CreateSubscriptionDto {
    return {
      price: productInfo.price,
      period: productInfo.period,
      interval: productInfo.interval,
      subscriptionPriceId: productInfo.subscriptionPriceId,
      productPriceId: productInfo.productPriceId,
      paypalSubscriptionId,
      paymentSystem,
      userId,
    };
  }

  static createSubscriptionDtoByOldSubscription(
    oldSubscription: SubscriptionEntity
    ): CreateSubscriptionDto{
    return {
      period: oldSubscription.period,
      interval: oldSubscription.interval,
      subscriptionPriceId: oldSubscription.subscriptionPriceId,
      productPriceId: oldSubscription.productPriceId,
      paypalSubscriptionId: oldSubscription.paypalSubscriptionId,
      paymentSystem: 'Paypal',
      userId: oldSubscription.userId
    }
  }
}
