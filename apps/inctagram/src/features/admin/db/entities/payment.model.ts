import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  PaymentEnumTypes,
  SubscriptionEnumTypes,
} from '../../../../../../../types/subscription-enum.types';

@ObjectType()
export class PaymentModel {
  @Field(() => Int, { description: 'payment id' })
  id: number;

  @Field(() => Int, { description: 'payment userId' })
  userId: number;

  @Field(() => Int, { description: 'payment amount' })
  amount: string;

  @Field({ description: 'payment dateOfPayment' })
  dateOfPayment: string;

  @Field({ description: 'payment dateOfNextPayment' })
  dateOfNextPayment: string;

  @Field(() => SubscriptionEnumTypes, { description: 'subscription Type' })
  subscriptionType: SubscriptionEnumTypes;

  @Field(() => PaymentEnumTypes, { description: 'Payment Types' })
  paymentType: PaymentEnumTypes;
}
