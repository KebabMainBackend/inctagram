import {
  IsBoolean,
  IsDate,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class purchaseSubscriptionDto {
  @IsString()
  subscriptionType: '1' | '7' | '31';
  @IsString()
  paymentType: 'PayPall' | 'Stripe';
  @IsInt()
  price: number;
  @IsOptional()
  @IsDate()
  endDateOfSubscription: Date;
}

export class updateAutoRenewalStatusDto {
  @IsBoolean()
  autoRenewal: boolean;
}
