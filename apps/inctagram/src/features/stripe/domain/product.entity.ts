import { IsDate, IsInt, IsString } from 'class-validator';

export class ProductEntity {
  @IsInt()
  price: number;
  @IsInt()
  period: number;
  @IsString()
  subscriptionPriceId: string;
  @IsString()
  productPriceId: string;
  @IsString()
  interval: 'day' | 'week' | 'month' | 'year'

  static create(productPriceId, subscriptionPriceId,
                price, period, interval, ) {

    const product = new ProductEntity();

    product.productPriceId = productPriceId;
    product.price = price;
    product.period = period;
    product.interval = interval
    product.subscriptionPriceId = subscriptionPriceId

    return product;
  }
}
