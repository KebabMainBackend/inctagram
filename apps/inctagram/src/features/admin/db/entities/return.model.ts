import { ObjectType, Field } from '@nestjs/graphql';
import { UserModel } from './user.model';
import { PaginationModel } from './pagination.model';
import { PaymentModel } from './payment.model';

@ObjectType()
export class UserPaginationModel {
  @Field(() => [UserModel], { description: 'users', nullable: true })
  users: UserModel[];

  @Field(() => PaginationModel, { description: 'users', nullable: true })
  pagination: PaginationModel;
}

@ObjectType()
export class UserPaymentsPaginationModel extends PaginationModel {
  @Field(() => [PaymentModel], { description: 'user payments' })
  items: PaymentModel[];
}
