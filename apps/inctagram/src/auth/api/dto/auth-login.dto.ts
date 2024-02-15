import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  @ApiProperty({
    description: 'email: email for create/registration User',
    example: 'example@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({
    description: 'password: password for create/registration User',
    example: 'Pa$$w0rD',
  })
  password: string;
}
