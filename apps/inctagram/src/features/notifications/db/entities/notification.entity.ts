import { IsString, IsNumber, IsBoolean, IsDate } from 'class-validator';
import { CreateDbNotificationDto } from '../dto/create-notification.dto';

export class NotificationEntity {
  @IsNumber()
  id: number;
  @IsString()
  message: string;

  @IsNumber()
  userId: number;

  @IsDate()
  notifyAt: Date;
  @IsDate()
  createdAt: Date;

  @IsBoolean()
  isRead: boolean;

  static create(data: CreateDbNotificationDto) {
    const notification = new NotificationEntity();

    notification.message = data.message;
    notification.userId = data.userId;

    return notification;
  }
}
