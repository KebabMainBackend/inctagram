import { purchaseSubscriptionDto } from '../api/dto';
import { addDays, addMonths } from 'date-fns';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';

export class SubscriptionEntity {
  @IsInt()
  userId: number;
  @IsString()
  subscriptionType: string;
  @IsDate()
  dateOfSubscribe: Date;
  @IsDate()
  dateOfNextPayment: Date;
  @IsBoolean()
  autoRenewal: boolean;
  @IsString()
  paymentType: 'PayPall' | 'Stripe';
  @IsDate()
  expireAt: Date;
  static create(data: purchaseSubscriptionDto, userId: number) {
    const { subscriptionType, paymentType } = data;
    const subscription = new SubscriptionEntity();

    subscription.userId = userId;

    subscription.subscriptionType = subscriptionType;
    subscription.paymentType = paymentType;
    subscription.autoRenewal = false;

    subscription.dateOfSubscribe = new Date();

    if (subscription.subscriptionType === '1')
      subscription.dateOfNextPayment = addDays(new Date(), 1);
    else if (subscription.subscriptionType === '7')
      subscription.dateOfNextPayment = addDays(new Date(), 7);
    else if (subscription.subscriptionType === '31')
      subscription.dateOfNextPayment = addMonths(new Date(), 1);

    subscription.expireAt = addDays(new Date(), Number(subscriptionType));

    return subscription;
  }

  static renewSubscription(
    existingSubscription: SubscriptionEntity,
    data: purchaseSubscriptionDto,
  ) {
    const { subscriptionType, paymentType } = data;

    const expireAt = addDays(
      existingSubscription.dateOfNextPayment,
      Number(subscriptionType),
    );

    return { dateOfNextPayment: expireAt, expireAt, paymentType };
  }
}
