import { addDays } from 'date-fns';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { CreateSubscriptionDto } from '../../api/dto/subscription.dto';

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
  @IsString()
  productPriceId: string | null;
  @IsString()
  subscriptionPriceId: string | null;
  @IsString()
  paypalSubscriptionId: string | null;
  @IsString()
  interval: 'day' | 'week' | 'month' | 'year';
  static create(data: CreateSubscriptionDto, autoRenewal = false) {
    const {
      paymentSystem,
      userId,
      period,
      productPriceId,
      subscriptionPriceId,
      paypalSubscriptionId,
      interval,
    } = data;

    const subscription = new SubscriptionEntity();

    subscription.userId = userId;

    subscription.paymentSystem = paymentSystem;
    subscription.autoRenewal = autoRenewal;

    subscription.dateOfSubscribe = new Date();
    subscription.dateOfNextPayment = addDays(new Date(), period);

    subscription.productPriceId = productPriceId;
    subscription.subscriptionPriceId = subscriptionPriceId;
    subscription.paypalSubscriptionId = paypalSubscriptionId;

    subscription.period = period;
    subscription.interval = interval;

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
