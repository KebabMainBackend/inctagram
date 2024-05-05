import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  PAGE_NUMBER_DEFAULT,
  PAGE_SIZE_DEFAULT,
  SortDirection,
} from './constants/default-query-params';

export class GetDefaultUriDtoWithCursor {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  sortBy: string = '';

  @IsOptional()
  @IsEnum(SortDirection)
  @MaxLength(4)
  sortDirection: SortDirection = SortDirection.DESC;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize: number = PAGE_SIZE_DEFAULT;

  @IsOptional()
  cursor: string;
}

export class GetDefaultUriDtoWithPageNumber {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  sortBy: string = '';

  @IsOptional()
  @IsEnum(SortDirection)
  @MaxLength(4)
  sortDirection: SortDirection = SortDirection.DESC;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize: number = PAGE_SIZE_DEFAULT;

  @IsOptional()
  pageNumber: number = PAGE_NUMBER_DEFAULT;
}
