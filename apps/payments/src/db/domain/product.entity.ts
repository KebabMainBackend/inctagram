import { IsInt, IsString } from 'class-validator';
type ProductType = {
  price: number;
  period: number;
  subscriptionPriceId: string;
  productPriceId: string;
  interval: 'day' | 'week' | 'month' | 'year';
};
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
  interval: 'day' | 'week' | 'month' | 'year';

  static create({
    productPriceId,
    subscriptionPriceId,
    price,
    period,
    interval,
  }: ProductType) {
    const product = new ProductEntity();

    product.productPriceId = productPriceId;
    product.price = price;
    product.period = period;
    product.interval = interval;
    product.subscriptionPriceId = subscriptionPriceId;

    return product;
  }
}
