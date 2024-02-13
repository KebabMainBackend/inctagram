import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class AuthResendCodeDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
  @ApiProperty({
    description: 'email: email for create/registration User',
    example: 'example@gmail.com',
  })
  email: string;
}
