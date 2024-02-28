import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { trimTransformer } from '../../../../../utils/custom-validators/trim-transformer';

export class CreatePostBodyInputModel {
  @Transform(({ value }) => trimTransformer(value, 'description'))
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;
}
