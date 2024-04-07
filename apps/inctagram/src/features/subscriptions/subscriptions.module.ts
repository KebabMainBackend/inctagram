import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientProxyFactory,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';
import { PrismaService } from '../../prisma.service';
import { EmailService } from '../../auth/managers/email.manager';
import { SubscriptionsController } from './api/subscriptions.controller';
import { UsersRepository } from '../../auth/db/users.repository';
import { RmqUrl } from '@nestjs/microservices/external/rmq-url.interface';
import { PaymentsController } from './api/payments.controller';

const Repos = [EmailService, UsersRepository];
@Module({
  imports: [CqrsModule, JwtModule, ConfigModule],
  controllers: [SubscriptionsController, PaymentsController],
  providers: [
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
    ...Repos,
  ],
})
export class SubscriptionsModule {}
