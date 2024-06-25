import { Module } from '@nestjs/common';
import { NotificationsService } from './application/notifications.service';
import { NotificationsGateway } from './api/notifications.gateway';

@Module({
  providers: [NotificationsGateway, NotificationsService],
})
export class NotificationsModule {}
