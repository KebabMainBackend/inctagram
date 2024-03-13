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
  PAGE_SIZE_DEFAULT,
  SortDirection,
} from './constants/default-query-params';

export class GetDefaultUriDto {
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
