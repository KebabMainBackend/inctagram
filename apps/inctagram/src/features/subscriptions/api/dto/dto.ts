import { IsBoolean, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  paymentSystem: 'PayPal' | 'Stripe';
}

export class UpdateAutoRenewalStatusDto {
  @IsInt()
  subscriptionId: number;
  @IsBoolean()
  autoRenewal: boolean;
}
