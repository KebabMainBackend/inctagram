import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../../auth/db/users.repository';
import { PrismaService } from '../../prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientProxyFactory,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';
import { RmqUrl } from '@nestjs/microservices/external/rmq-url.interface';
import { MessengerGateway } from './api/messenger.gateway';
import { MessengerController } from './api/messenger.controller';

@Module({
  imports: [ConfigModule],
  controllers: [MessengerController],
  providers: [
    MessengerGateway,
    PrismaService,
    JwtService,
    UsersRepository,
    {
      provide: 'MESSENGER_SERVICE',
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
  ],
})
export class MessengerModule {}
