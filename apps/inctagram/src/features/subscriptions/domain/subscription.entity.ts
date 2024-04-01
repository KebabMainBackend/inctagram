import { purchaseSubscriptionDto } from '../api/dto';
import { addDays, addMonths } from 'date-fns';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { ProductEntity } from "../../stripe/domain/product.entity";
import { Optional } from "@nestjs/common";

export class SubscriptionEntity {
  @IsInt()
  userId: number;
  @IsInt()
  period: number;
  @IsDate()
  dateOfSubscribe: Date;
  @IsDate()
  dateOfNextPayment: Date;
  @IsBoolean()
  autoRenewal: boolean;
  @IsString()
  paymentSystem: 'PayPall' | 'Stripe';
  @IsDate()
  expireAt: Date;
  @IsString()
  productPriceId: string;
  @IsString()
  subscriptionPriceId: string
  @IsString()
  interval: 'day' | 'week' | 'month' | 'year';
  static create(data: purchaseSubscriptionDto, productInfo: ProductEntity, userId: number) {
    const { paymentSystem } = data;
    const subscription = new SubscriptionEntity();

    subscription.userId = userId;

    subscription.paymentSystem = paymentSystem;
    subscription.autoRenewal = false;

    subscription.dateOfSubscribe = new Date();
    subscription.dateOfNextPayment = addDays(new Date(), productInfo.period);

    subscription.productPriceId = productInfo.productPriceId
    subscription.subscriptionPriceId = productInfo.subscriptionPriceId

    subscription.period = productInfo.period;
    subscription.interval = productInfo.interval

    return subscription;
  }

  static renewSubscription(
    dateOfNextPayment: Date,
    period: number,
  ) {

    const expireAt = addDays(
      dateOfNextPayment,
      Number(period),
    );

    return { dateOfNextPayment: expireAt, expireAt };
  }
}
