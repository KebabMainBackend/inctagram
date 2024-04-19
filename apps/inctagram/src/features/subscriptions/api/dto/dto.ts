import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PurchaseSubscriptionDto {
  @IsString()
  @ApiProperty({
    name: 'productPriceId',
    example: 'price_1P3HsVAPDz5prGS3BRdMfPwW',
    description: 'productId from /products',
  })
  productPriceId: string;
  @IsString()
  @ApiProperty({
    name: 'paymentSystem',
    example: 'Paypal',
    description: 'Paypal or Stripe',
  })
  paymentSystem: 'Paypal' | 'Stripe';
}

export class UpdateAutoRenewalStatusDto {
  @IsNumber()
  @ApiProperty({
    name: 'subscriptionId',
    example: 2,
    description: 'subscription id',
  })
  subscriptionId: number;
  @IsBoolean()
  autoRenewal: boolean;
}
