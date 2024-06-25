import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { NotificationEntity } from './entities/notification.entity';

@Injectable()
export class NotificationsRepository {
  constructor(protected prismaClient: PrismaService) {}
  async getUserNotifications(userId: number) {
    const notifications = await this.prismaClient.notifications.findMany({
      where: {
        userId,
      },
    });
    return notifications.map((n) => this.mapNotification(n));
  }

  async createNotification(notification: NotificationEntity) {
    return this.prismaClient.notifications.create({
      data: notification,
    });
  }
  async updateNotification(notificationId: number) {
    await this.prismaClient.notifications.update({
      where: { id: notificationId },
      data: {
        isRead: true,
        notifyAt: new Date(),
      },
    });
  }
  private mapNotification(notification: NotificationEntity) {
    return {
      id: notification.id,
      isRead: notification.isRead,
      message: notification.message,
      notifyAt: notification.notifyAt,
      createdAt: notification.createdAt,
    };
  }
}
