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

const repos = [UsersQueryRepository, UsersRepository];
const commandHandler = [DeleteUserHandler];
@Module({
  imports: [CqrsModule],
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
    ...repos,
    ...commandHandler,
  ],
})
export class AdminModule {}
