import { IsDate, IsInt, IsString } from 'class-validator';
import { ProductEntity } from './product.entity';
import { PurchaseSubscriptionDto } from '../../api/dto/subscription.dto';

type PaymentType = {
  data: PurchaseSubscriptionDto;
  productInfo: ProductEntity;
  endDateOfSubscription: Date;
  userId: number;
};

export class PaymentsEntity {
  @IsInt()
  userId: number;
  @IsDate()
  dateOfPayment: Date;
  @IsDate()
  endDateOfSubscription: Date;
  @IsInt()
  price: number;
  @IsString()
  paymentSystem: 'Paypal' | 'Stripe';
  @IsString()
  productPriceId: string | null;
  @IsString()
  subscriptionPriceId: string | null;
  @IsString()
  paypalSubscriptionId: string | null

  static create({
    data,
    productInfo,
    endDateOfSubscription,
    userId,
  }: PaymentType) {
    const { paymentSystem } = data;
    const payment = new PaymentsEntity();

    payment.userId = userId;
    payment.dateOfPayment = new Date();
    payment.endDateOfSubscription = endDateOfSubscription;
    payment.price = productInfo.price;
    payment.paymentSystem = paymentSystem;

    payment.productPriceId = productInfo.productPriceId;
    payment.subscriptionPriceId = productInfo.subscriptionPriceId;

    return payment;
  }
}
