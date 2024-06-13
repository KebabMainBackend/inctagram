import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserModel } from './user.model';
import { PaginationModel } from './pagination.model';
import { PaymentModel, UsersPaymentsModel } from './payment.model';
import { PostModel } from './post.model';

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

@ObjectType()
export class UsersPaymentsPaginationModel extends PaginationModel {
  @Field(() => [UsersPaymentsModel], { description: 'users payments' })
  items: UsersPaymentsModel[];
}

@ObjectType()
export class PostsPaginationModel {
  @Field(() => Boolean)
  hasMore: boolean;
  @Field(() => Int)
  cursor: number;
  @Field(() => Int)
  pageSize: number;
  @Field(() => Int)
  totalCount: number;
  @Field(() => [PostModel], { description: 'posts' })
  items: PostModel[];
}
