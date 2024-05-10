import { Field, Int, ArgsType } from '@nestjs/graphql';
import {
  PAGE_NUMBER_DEFAULT,
  PAGE_SIZE_DEFAULT__LARGE,
  SortDirection,
} from '../../../../utils/constants/default-query-params';
import { Min } from 'class-validator';

@ArgsType()
export class GetUsersQueryDto {
  @Field(() => Int, { defaultValue: PAGE_SIZE_DEFAULT__LARGE, nullable: true })
  @Min(0)
  pageSize: number = PAGE_SIZE_DEFAULT__LARGE;
  @Field(() => Int, { defaultValue: PAGE_NUMBER_DEFAULT, nullable: true })
  pageNumber: number = 1;
  @Field({ defaultValue: 'createdAt', nullable: true })
  sortBy: string = 'createdAt';
  @Field(() => String, { defaultValue: SortDirection.DESC, nullable: true })
  sortDirection: SortDirection = SortDirection.DESC;
  @Field({ nullable: true })
  searchTerm: string = '';
  // @Field(() => statusFilter, { defaultValue: 1 })
  // statusFilter: number;

  // statusFilter: UserBlockStatus = ALL;
}

@ArgsType()
export class GetUserPaymentsQueryDto {
  @Field(() => Int, { defaultValue: PAGE_SIZE_DEFAULT__LARGE, nullable: true })
  @Min(0)
  pageSize: number = PAGE_SIZE_DEFAULT__LARGE;
  @Field(() => Int, { defaultValue: PAGE_NUMBER_DEFAULT, nullable: true })
  pageNumber: number = PAGE_NUMBER_DEFAULT;
}
