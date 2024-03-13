import { ApiProperty } from '@nestjs/swagger';

export class UploadPostImageDto {
  @ApiProperty({
    description: 'file',
    type: 'string',
    format: 'binary',
    isArray: true,
  })
  file: string;
}
