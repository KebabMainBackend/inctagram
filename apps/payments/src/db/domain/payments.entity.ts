import { IsDate, IsInt, IsNumber, IsString } from 'class-validator';
import { PaymentInterval } from '@prisma/client';

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
  interval: PaymentInterval;
  @IsString()
  productPriceId: string | null;
  @IsString()
  subscriptionPriceId: string | null;
  @IsString()
  paypalSubscriptionId: string | null;
  @IsNumber()
  subscriptionId: number;

  static create(data: {
    paymentSystem: 'Paypal' | 'Stripe';
    productInfo: {
      price: number;
      interval: PaymentInterval;
      productPriceId: string;
      subscriptionPriceId: string;
    };
    endDateOfSubscription: Date;
    userId: number;
    subscriptionId: number;
  }) {
    const payment = new PaymentsEntity();

    payment.userId = data.userId;
    payment.dateOfPayment = new Date();
    payment.endDateOfSubscription = data.endDateOfSubscription;
    payment.price = data.productInfo.price;
    payment.paymentSystem = data.paymentSystem;
    payment.interval = data.productInfo.interval;
    payment.subscriptionId = data.subscriptionId;

    payment.productPriceId = data.productInfo.productPriceId;
    payment.subscriptionPriceId = data.productInfo.subscriptionPriceId;

    return payment;
  }
}
