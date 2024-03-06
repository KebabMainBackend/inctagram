import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class AuthResendRecoveryCodeDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
  @ApiProperty({
    description: 'email: email for recovering password',
    example: 'example@gmail.com',
  })
  email: string;
}
