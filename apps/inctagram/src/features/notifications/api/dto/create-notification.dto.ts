import { IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  message: string;
  @IsNumber()
  userId: number;
}
