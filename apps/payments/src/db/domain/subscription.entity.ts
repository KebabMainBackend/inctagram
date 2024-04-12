import { addDays } from 'date-fns';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { PurchaseSubscriptionDto } from '../../api/dto/subscription.dto';
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
  static create(
    data: PurchaseSubscriptionDto,
    productInfo: ProductEntity,
    userId: number,
    paypalSubscriptionId: string | null,
    subscriptionStatus?: 'Pending' | 'Confirmed'
  ) {
    const { paymentSystem } = data;
    const subscription = new SubscriptionEntity();

    subscription.userId = userId;

    subscription.paymentSystem = paymentSystem;
    subscription.autoRenewal = false;

    subscription.dateOfSubscribe = new Date();
    subscription.dateOfNextPayment = addDays(new Date(), productInfo.period);

    subscription.productPriceId = productInfo.productPriceId;
    subscription.subscriptionPriceId = productInfo.subscriptionPriceId;
    subscription.paypalSubscriptionId = paypalSubscriptionId

    subscription.period = productInfo.period;
    subscription.interval = productInfo.interval;

    subscription.subscriptionStatus = subscriptionStatus ?? 'Confirmed'

    return subscription;
  }

  static renewSubscription(dateOfNextPayment: Date, period: number) {
    const expireAt = addDays(dateOfNextPayment, Number(period));

    return { dateOfNextPayment: expireAt, expireAt };
  }
}
