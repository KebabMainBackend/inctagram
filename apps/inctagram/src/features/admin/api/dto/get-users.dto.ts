import { Field, Int, ArgsType, registerEnumType } from '@nestjs/graphql';
import {
  PAGE_NUMBER_DEFAULT,
  PAGE_SIZE_DEFAULT__LARGE,
  SortDirection,
} from '../../../../utils/constants/default-query-params';
import { IsOptional, Min } from 'class-validator';

registerEnumType(SortDirection, { name: 'SortDirection' });
@ArgsType()
export class GetUsersQueryDto {
  @Field(() => Int, { defaultValue: PAGE_NUMBER_DEFAULT, nullable: true })
  @Min(0)
  pageNumber: number;
  @Field(() => Int, { defaultValue: PAGE_SIZE_DEFAULT__LARGE, nullable: true })
  @Min(0)
  pageSize: number;
  @Field({ defaultValue: 'createdAt', nullable: true })
  @IsOptional()
  sortBy: string;
  @Field(() => SortDirection, {
    defaultValue: SortDirection.DESC,
    nullable: true,
  })
  @IsOptional()
  sortDirection: SortDirection;
  @Field({ nullable: true })
  @IsOptional()
  searchTerm: string;
}
// @Field(() => statusFilter, { defaultValue: 1 })
// statusFilter: number;

// statusFilter: UserBlockStatus = ALL;
@ArgsType()
export class GetUserPaymentsQueryDto {
  @Field(() => Int, { defaultValue: PAGE_SIZE_DEFAULT__LARGE, nullable: true })
  @Min(0)
  pageSize: number = PAGE_SIZE_DEFAULT__LARGE;
  @Field(() => Int, { defaultValue: PAGE_NUMBER_DEFAULT, nullable: true })
  @IsOptional()
  pageNumber: number = PAGE_NUMBER_DEFAULT;
}
