import { IsInt, IsString } from 'class-validator';
type ProductType = {
  price: number;
  period: number;
  subscriptionPriceId: string | null;
  productPriceId: string | null;
  paypalPlanId: string | null;
  interval: 'day' | 'week' | 'month' | 'year';
};
export class ProductEntity {
  @IsInt()
  price: number;
  @IsInt()
  period: number;
  @IsString()
  subscriptionPriceId: string | null;
  @IsString()
  productPriceId: string | null;
  @IsString()
  paypalPlanId: string | null;
  @IsString()
  interval: 'day' | 'week' | 'month' | 'year';

  static create({
    productPriceId,
    subscriptionPriceId,
    price,
    period,
    interval,
    paypalPlanId,
  }: ProductType) {
    const product = new ProductEntity();

    product.productPriceId = productPriceId;
    product.price = price;
    product.period = period;
    product.interval = interval;
    product.subscriptionPriceId = subscriptionPriceId;
    product.paypalPlanId = paypalPlanId;

    return product;
  }
}
