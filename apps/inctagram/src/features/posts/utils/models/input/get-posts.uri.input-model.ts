import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  PAGE_SIZE_DEFAULT,
  SortDirection,
} from '../../../../../utils/constants';

export class GetPostsUriInputModel {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  sortBy: string = '';

  @IsOptional()
  @IsEnum(SortDirection)
  @MaxLength(4)
  sortDirection: SortDirection = SortDirection.Desc;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize: number = PAGE_SIZE_DEFAULT;

  @IsOptional()
  @IsUUID()
  cursor: string;
}
