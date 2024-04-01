import { IsInt, IsString } from 'class-validator';

export class addNewSubscriptionTypeDto {
  @IsInt()
  price: number;
  @IsString()
  currency: 'usd' | 'eur' | 'ru';
  @IsString()
  productName: string;
  @IsString()
  description: string;
  @IsString()
  interval: 'month' | 'week' | 'day' | 'year';
  @IsInt()
  period: number;
}

export class makeAPurchaseDto {
  @IsString()
  priceId: string;
}
