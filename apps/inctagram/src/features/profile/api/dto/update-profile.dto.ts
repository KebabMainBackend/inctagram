import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'username',
    example: 'string',
  })
  @MinLength(6)
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9_-]*$/)
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'firstname',
    example: 'string',
  })
  @MinLength(1)
  @MaxLength(50)
  @Matches(/^[a-zA-Zа-яА-Я]*$/)
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'lastname',
    example: 'string',
  })
  @MinLength(1)
  @MaxLength(50)
  @Matches(/^[a-zA-Zа-яА-Я]*$/)
  lastname: string;

  @IsDateString()
  @ApiProperty({
    description: 'birthDate',
    example: '2020-01-01',
  })
  birthDate: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'about me',
    example: 'string',
    nullable: true,
  })
  @MinLength(0)
  @MaxLength(200)
  @Matches(/^[a-zA-Zа-яА-Я0-9!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~\s]*$/)
  aboutMe: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'city',
    nullable: true,
  })
  city: string;
}
