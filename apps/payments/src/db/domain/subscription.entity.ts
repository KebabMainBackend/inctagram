import { addDays } from 'date-fns';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { CreateSubscriptionDto, PurchaseSubscriptionDto } from "../../api/dto/subscription.dto";
import { ProductEntity } from './product.entity';

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
  paymentSystem: 'Paypal' | 'Stripe';
  @IsDate()
  expireAt: Date;
  @IsString()
  productPriceId: string | null;
  @IsString()
  subscriptionPriceId: string | null;
  @IsString()
  paypalSubscriptionId: string | null
  @IsString()
  interval: 'day' | 'week' | 'month' | 'year';
  @IsString()
  subscriptionStatus: 'Pending' | 'Confirmed'
  static create(data: CreateSubscriptionDto) {
    const {
      paymentSystem,
      userId,
      period,
      productPriceId,
      subscriptionPriceId,
      paypalSubscriptionId,
      interval} = data;

    const subscription = new SubscriptionEntity();

    subscription.userId = userId;

    subscription.paymentSystem = paymentSystem;
    subscription.autoRenewal = false;

    subscription.dateOfSubscribe = new Date();
    subscription.dateOfNextPayment = addDays(new Date(), period);

    subscription.productPriceId = productPriceId;
    subscription.subscriptionPriceId = subscriptionPriceId;
    subscription.paypalSubscriptionId = paypalSubscriptionId

    subscription.period = period;
    subscription.interval = interval;

    subscription.subscriptionStatus = 'Confirmed'

    return subscription;
  }

  static renewSubscription(dateOfNextPayment: Date, period: number) {
    const expireAt = addDays(dateOfNextPayment, Number(period));

    return { dateOfNextPayment: expireAt, expireAt };
  }

  static getNewExpireAt(previousExpireAt: Date, period: number) {
    return addDays(previousExpireAt, Number(period));
  }
}
