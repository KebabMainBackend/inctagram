import {
  IsDate,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @IsString()
  @ApiProperty({
    description: 'firstname: firstname for create Profile',
    example: 'string',
  })
  @MinLength(1)
  @MaxLength(50)
  @Matches(/^[a-zA-Zа-яА-Я]*$/)
  firstname: string;

  @IsString()
  @ApiProperty({
    description: 'lastname: lastname for create Profile',
    example: 'string',
  })
  @MinLength(1)
  @MaxLength(50)
  @Matches(/^[a-zA-Zа-яА-Я]*$/)
  lastname: string;

  @IsDate()
  @ApiProperty({
    description: 'birthDate: birthDate for create Profile',
    example: 'string',
  })
  birthDate: Date;

  @IsString()
  @ApiProperty({
    description: 'lastname: lastname for create Profile',
    example: 'string',
  })
  @MinLength(0)
  @MaxLength(200)
  @Matches(/^[a-zA-Zа-яА-Я0-9!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]*$/)
  aboutMe: string;
}
