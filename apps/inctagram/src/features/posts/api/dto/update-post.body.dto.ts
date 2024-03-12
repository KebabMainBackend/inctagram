import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { trimTransformer } from '../../../../utils/custom-validators/trim-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostBodyDto {
  @Transform(({ value }) => trimTransformer(value, 'description'))
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'post description',
    example: 'cool post about my journey',
    maxLength: 500,
    nullable: true,
  })
  @MaxLength(500)
  description: string;
}
