import { Field, Int, ArgsType, registerEnumType } from '@nestjs/graphql';
import {
  PAGE_NUMBER_DEFAULT,
  PAGE_SIZE_DEFAULT__LARGE,
  SortDirection,
} from '../../../../utils/constants/default-query-params';
import { IsOptional, Min } from 'class-validator';
import { BanStatus } from '../../../../types/ban.types';

registerEnumType(SortDirection, { name: 'SortDirection' });
registerEnumType(BanStatus, { name: 'BanStatus' });
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

  @Field(() => BanStatus, { nullable: true })
  @IsOptional()
  statusFilter: BanStatus;
}

@ArgsType()
export class GetUserPaymentsQueryDto {
  @Field(() => Int, { defaultValue: PAGE_SIZE_DEFAULT__LARGE, nullable: true })
  @Min(0)
  pageSize: number = PAGE_SIZE_DEFAULT__LARGE;
  @Field(() => Int, { defaultValue: PAGE_NUMBER_DEFAULT, nullable: true })
  @IsOptional()
  pageNumber: number = PAGE_NUMBER_DEFAULT;
}

@ArgsType()
export class GetUsersPaymentsQueryDto extends GetUserPaymentsQueryDto {
  @Field({ nullable: true })
  @IsOptional()
  searchTerm: string;

  @Field({
    nullable: true,
    description: 'price, paymentSystem, dateOfPayment, username',
  })
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
  isAutoUpdate: boolean;
}
