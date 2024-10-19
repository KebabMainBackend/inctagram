import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessengerController } from './api/messenger.controller';
import { SendMessageHandler } from './use-cases/send-message.command';
import { MessagesRepository } from './db/messages.repository';
import { ChatsRepository } from './db/chats.repository';
import { ChatMembersRepository } from './db/chatMembers.repository';
import { UsersRepository } from '../../inctagram/src/auth/db/users.repository';
import { PrismaService } from 'apps/inctagram/src/prisma.service';
import { GetChatHandler } from './use-cases/get-chat.command';
import { GetAllChatsHandler } from './use-cases/get-all-chats.command';
import { MessengerAdapter } from './adapters/messenger.adapter';
import { TcpClientOptions } from '@nestjs/microservices/interfaces/client-metadata.interface';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

const handlers = [SendMessageHandler, GetChatHandler, GetAllChatsHandler];
const repos = [
  MessengerAdapter,
  UsersRepository,
  MessagesRepository,
  ChatsRepository,
  ChatMembersRepository,
];

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.dev'],
    }),
  ],
  controllers: [MessengerController],
  providers: [
    {
      provide: 'FILES_SERVICE',
      useFactory: (configService: ConfigService) => {
        const options: TcpClientOptions = {
          transport: Transport.TCP,
          options: {
            host: configService.get('FILES_SERVICE_HOST'),
            port: configService.get('FILES_SERVICE_PORT'),
          },
        };
        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
    PrismaService,
    ...handlers,
    ...repos,
  ],
})
export class MessengerModule {}
