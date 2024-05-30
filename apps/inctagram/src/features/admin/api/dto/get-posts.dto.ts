import { Field, Int, ArgsType } from '@nestjs/graphql';
import {
  PAGE_NUMBER_DEFAULT,
  PAGE_SIZE_DEFAULT__LARGE,
  SortDirection,
} from '../../../../utils/constants/default-query-params';
import { IsOptional, Min } from 'class-validator';

@ArgsType()
export class GetPostsQueryDto {
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

  @Field({ nullable: true })
  @IsOptional()
  cursor: string;
}
