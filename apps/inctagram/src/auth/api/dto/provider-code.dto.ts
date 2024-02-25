import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProviderCodeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'code: token which was returned by provider',
    example: 'string',
  })
  code: string;
}
