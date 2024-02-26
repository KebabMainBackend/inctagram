import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthRegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'username: name for create/registration User',
    example: 'string',
  })
  @MinLength(6)
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9_-]*$/)
  username: string;

  @IsEmail()
  @ApiProperty({
    description: 'email: email for create/registration User',
    example: 'example@gmail.com',
  })
  @Matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({
    description: 'password: password for create/registration User',
    example: 'Pa$$w0rd',
  })
  @Matches(
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]+$/,
  )
  password: string;
}
