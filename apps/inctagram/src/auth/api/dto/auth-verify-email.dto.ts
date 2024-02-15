import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthVerifyEmailDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'code that be sent via Email inside link',
    example: 'string',
  })
  confirmationCode: string;
}
