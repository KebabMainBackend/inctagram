import { IsInt, IsString } from 'class-validator';

export class addNewSubscriptionTypeDto {
  @IsInt()
  productPrice: number;
  @IsString()
  currency: 'usd' | 'eur' | 'ru';
  @IsString()
  productName: string;
  @IsString()
  description: string;
  @IsString()
  interval: 'month' | 'week' | 'day' | 'year';
  @IsString()
  type: string;
  @IsString()
  category: string;
}

export class addNewProductDto {
  @IsString()
  productId: string;
  @IsString()
  priceId: string;
  @IsString()
  type: string;
  @IsString()
  category: string;
  @IsInt()
  price: number;
}

export class makeAPurchaseDto {
  @IsString()
  priceId: string;
  @IsInt()
  quantity: number;
}
