import { Injectable } from '@nestjs/common';
import { CreateDbNotificationDto } from '../db/dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  create(createNotificationDto: CreateDbNotificationDto) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: CreateDbNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
