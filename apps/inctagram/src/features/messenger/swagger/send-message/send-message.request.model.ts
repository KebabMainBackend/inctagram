import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class SendMessageModel {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value?.trim().replace(/\s+/g, ' ') || '')
  @Matches(/^(?!\s*$).+/, {
    message: 'Message should not be an empty string or contain only spaces',
  })
  @ApiProperty({
    description: 'Text, might to be null if img or voice is not null',
    nullable: false,
    type: String,
    required: false,
  })
  message: string | null;
}

export class SendMessageRequest extends SendMessageModel {
  @IsOptional()
  @ApiProperty({
    description: 'File max size - 1MB',
    nullable: false,
    type: 'string',
    format: 'binary',
    required: false,
  })
  file: Express.Multer.File | null;
  // @IsOptional()
  // @ApiProperty({
  //   description: 'Max size of voice - 3MB',
  //   nullable: false,
  //   type: 'string',
  //   format: 'binary',
  //   required: true,
  // })
  // voice: Express.Multer.File;
}
