import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PaymentModel {
  @Field(() => Int, { description: 'payment id' })
  id: number;

  @Field(() => Int, { description: 'payment userId' })
  userId: number;

  @Field(() => Int, { description: 'payment price' })
  price: string;

  @Field({ description: 'payment dateOfPayments' })
  dateOfPayments: string;

  @Field({ description: 'payment endDateOfSubscription' })
  endDateOfSubscription: string;

  @Field({ description: 'subscription Type' })
  subscriptionType: string;

  @Field({ description: 'Payment Types' })
  paymentType: string;
}
@ObjectType()
export class UsersPaymentsModel extends PaymentModel {
  @Field({ description: 'user avatar', nullable: true })
  avatar: string;

  @Field({ description: 'username' })
  username: string;
}
