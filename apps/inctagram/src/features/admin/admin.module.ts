import { Module } from '@nestjs/common';
import { AdminResolver } from './api/admin.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersQueryRepository } from './db/users.query-repository';
import { PrismaService } from '../../prisma.service';
import { ConfigService } from '@nestjs/config';
import { TcpClientOptions } from '@nestjs/microservices/interfaces/client-metadata.interface';
import {
  ClientProxyFactory,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';
import { RmqUrl } from '@nestjs/microservices/external/rmq-url.interface';
import { DeleteUserHandler } from './application/delete-user.command';
import { UsersRepository } from './db/users.repository';
import { ChangeBanStatusOfUserHandler } from './application/ban-user.command';
import { PubSub } from 'graphql-subscriptions';
import { PostsQueryRepository } from '../posts/db/posts.query-repository';
import { PubSubModule } from '../../modules/pubsub.module';

const repos = [UsersQueryRepository, UsersRepository, PostsQueryRepository];
const commandHandler = [DeleteUserHandler, ChangeBanStatusOfUserHandler];
@Module({
  imports: [CqrsModule, PubSubModule],
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
    {
      provide: 'PAYMENTS_SERVICE',
      useFactory: (configService: ConfigService) => {
        const options: RmqOptions = {
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('AMQP_RABBIT') as RmqUrl],
            queue: configService.get('QUEUE_NAME'),
          },
        };
        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
    PrismaService,
    AdminResolver,
    PubSub,
    ...repos,
    ...commandHandler,
  ],
})
export class AdminModule {}
