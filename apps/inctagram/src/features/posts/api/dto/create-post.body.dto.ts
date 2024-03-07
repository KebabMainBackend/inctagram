import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { trimTransformer } from '../../../../utils/custom-validators/trim-transformer';

export class CreatePostBodyDto {
  @Transform(({ value }) => trimTransformer(value, 'description'))
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(500)
  description: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  images: string[];
}
