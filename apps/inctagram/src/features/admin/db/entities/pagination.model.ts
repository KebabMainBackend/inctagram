import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PaginationModel {
  @Field(() => Int)
  pagesCount: number;
  @Field(() => Int)
  pageNumber: number;
  @Field(() => Int)
  pageSize: number;
  @Field(() => Int)
  totalCount: number;
}
