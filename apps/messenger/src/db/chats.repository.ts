import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/inctagram/src/prisma.service';
import { ChatMemberEntity } from './domain/chatMember.entity';

@Injectable()
export class ChatsRepository {
  constructor(private prisma: PrismaService) {}

  async save() {
    return await this.prisma.chat.create({});
  }

  async getOneByMembersIds(senderId: number, recipientId: number) {
    return await this.prisma.chat.findFirst({
      where: {
        AND: [
          {
            chatMember: {
              some: { memberId: senderId }, // Проверяем наличие участника с senderId
            },
          },
          {
            chatMember: {
              some: { memberId: recipientId }, // Проверяем наличие участника с recipientId
            },
          },
        ],
      },
      include: {
        chatMember: true,
      },
    });
  }

  async getOneByChatId(chatId: number) {
    return await this.prisma.chat.findFirst({
      where: { id: chatId },
      include: {
        chatMember: true,
        messages: {
          orderBy: {
            createdAt: 'asc', // Сортировка по возрастанию (самое старое в начале)
          },
        },
      },
    });
  }

  async getAllChatsByUserIdAndUsername(userId: number, username: string) {
    const chats = await this.prisma.chat.findMany({
      where: {
        chatMember: {
          some: {
            memberId: userId, // Фильтрация по userId
          },
        },
      },
      include: {
        chatMember: {
          where: {
            memberId: {
              not: userId, // Исключаем самого пользователя
            },
            memberUsername: {
              contains: username, // Частичное совпадение по username
              mode: 'insensitive', // Нечувствительность к регистру
            },
          },
          select: {
            memberId: true,
            memberUsername: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: 'desc', // Сортировка по дате последнего сообщения
          },
          take: 1, // Берём только последнее сообщение
          select: {
            message: true,
            imgUrl: true,
            voiceUrl: true,
            createdAt: true,
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    const filteredChats = chats
      .map((chat) => {
        if (chat.chatMember.length === 0) {
          return null; // Игнорируем чаты без участников
        }

        return {
          ...chat,
          chatMember: chat.chatMember
            .map((member) => {
              if (!member || !member.memberId) {
                return null;
              }
              return member;
            })
            .filter(Boolean),
        };
      })
      .filter(Boolean);

    filteredChats.sort((a, b) => {
      const messageA = a.messages[0]?.createdAt || new Date(0);
      const messageB = b.messages[0]?.createdAt || new Date(0);
      return messageB.getTime() - messageA.getTime();
    });

    return filteredChats;
  }

  async relateChatMembersToChat(
    chatId: number,
    firstMember: ChatMemberEntity,
    secondMember: ChatMemberEntity,
  ) {
    await this.prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        chatMember: {
          connect: [{ id: firstMember.id }, { id: secondMember.id }],
        },
      },
    });
  }

  async deleteByIds(chatIds: number[]) {
    await this.prisma.chat.deleteMany({
      where: {
        id: {
          in: chatIds,
        },
      },
    });
  }
}
