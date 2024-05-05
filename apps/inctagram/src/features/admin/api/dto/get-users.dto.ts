import { Field, Int, ArgsType } from '@nestjs/graphql';
import {
  PAGE_NUMBER_DEFAULT,
  PAGE_SIZE_DEFAULT__LARGE,
  SortDirection,
} from '../../../../utils/constants/default-query-params';

@ArgsType()
export class GetUsersQueryDto {
  @Field(() => Int, { defaultValue: PAGE_SIZE_DEFAULT__LARGE, nullable: true })
  pageSize: number;
  @Field(() => Int, { defaultValue: PAGE_NUMBER_DEFAULT, nullable: true })
  pageNumber: number;
  @Field({ defaultValue: 'createdAt', nullable: true })
  sortBy: string;
  @Field(() => String, { defaultValue: SortDirection.DESC, nullable: true })
  sortDirection: SortDirection;
  @Field({ nullable: true })
  searchTerm: string;
  // @Field(() => statusFilter, { defaultValue: 1 })
  // statusFilter: number;

  // statusFilter: UserBlockStatus = ALL;
}
