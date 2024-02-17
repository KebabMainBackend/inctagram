import { ApiProperty } from '@nestjs/swagger';

export class UploadAvatarDto {
  @ApiProperty({
    description: 'file',
    type: 'string',
    format: 'binary',
  })
  file: string;
}
