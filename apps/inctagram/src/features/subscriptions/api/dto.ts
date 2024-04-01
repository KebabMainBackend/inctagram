import { IsBoolean, IsInt, IsString } from 'class-validator';

export class purchaseSubscriptionDto {
  @IsString()
  productPriceId: string
  @IsString()
  paymentSystem: 'PayPall' | 'Stripe';
}

export class updateAutoRenewalStatusDto {
  @IsInt()
  subscriptionId: number
  @IsBoolean()
  autoRenewal: boolean;
}
