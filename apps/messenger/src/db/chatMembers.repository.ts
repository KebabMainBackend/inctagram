import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/inctagram/src/prisma.service';
import { ChatMemberEntity } from './domain/chatMember.entity';

@Injectable()
export class ChatMembersRepository {
  constructor(private prisma: PrismaService) {}

  async save(chatMember: ChatMemberEntity) {
    return await this.prisma.chatMember.create({ data: chatMember });
  }
}
