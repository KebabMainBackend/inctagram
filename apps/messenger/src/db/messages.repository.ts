import { Injectable } from '@nestjs/common';
import { MessageEntity } from './domain/message.entity';
import { PrismaService } from 'apps/inctagram/src/prisma.service';

@Injectable()
export class MessagesRepository {
  constructor(private prisma: PrismaService) {}

  async save(payload, senderId, chatId) {
    return await this.prisma.message.create({
      data: {
        user: {
          connect: {
            id: senderId,
          },
        },
        ...payload,
        chat: {
          connect: {
            id: chatId,
          },
        },
      },
    });
  }

  async getMany(criteria) {
    return await this.prisma.message.findMany({
      where: {
        chatId: criteria.chatId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getOneBy(criteria) {
    return await this.prisma.message.findFirst(criteria);
  }
}
