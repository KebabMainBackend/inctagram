import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckVerifyCodeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Code that be sent via Email inside link',
    example: 'string',
  })
  recoveryCode: string;
}
