import { ObjectType, Field } from '@nestjs/graphql';
import { UserModel } from './user.model';
import { PaginationModel } from './pagination.model';

@ObjectType()
export class UserPaginationModel {
  @Field(() => [UserModel], { description: 'users' })
  users: UserModel[];

  @Field(() => PaginationModel)
  pagination: PaginationModel;
}
