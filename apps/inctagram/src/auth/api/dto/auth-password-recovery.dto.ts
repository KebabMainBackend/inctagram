import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class AuthPasswordRecoveryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email User for recovery',
    example: 'string',
  })
  @Matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Recaptcha token',
    example: 'string',
  })
  recaptcha: string;
}
