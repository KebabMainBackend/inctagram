import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PurchaseSubscriptionDto {
  @IsString()
  @ApiProperty({
    name: 'productId from /products',
    example: 'price_1P3HsVAPDz5prGS3BRdMfPwW',
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
  @IsNumber()
  @ApiProperty({
    name: 'subscription id',
    example: 2,
  })
  subscriptionId: number;
  @IsBoolean()
  autoRenewal: boolean;
}
