import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthNewPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({
    description: 'password: password for create/registration User',
    example: 'Pa$$w0rD',
  })
  @Matches(
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]+$/,
  )
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Code that be sent via Email inside link',
    example: 'string',
  })
  recoveryCode;
}
