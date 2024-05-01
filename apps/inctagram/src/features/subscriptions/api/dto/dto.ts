import { IsBoolean, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DefaultValuePipe } from "@nestjs/common";

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

export class createPaypalWebhook {
  @IsString()
  url: string
}

export class GetUserPaymentsQueryDto {
  @IsString()
  limit: string = '3'
  @IsString()
  page: string = '1'
}
