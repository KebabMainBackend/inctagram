import { IsNumber, IsString } from 'class-validator';

export class CreateDbNotificationDto {
  @IsString()
  message: string;
  @IsNumber()
  userId: number;
}
