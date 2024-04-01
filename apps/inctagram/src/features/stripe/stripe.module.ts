import { EmailService } from '../../auth/managers/email.manager';
import { SubscriptionRepository } from '../subscriptions/db/subscription.repository';
import { UsersRepository } from '../../auth/db/users.repository';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SubscriptionsController } from '../subscriptions/api/subscriptions.controller';
import { TcpClientOptions } from '@nestjs/microservices/interfaces/client-metadata.interface';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PrismaService } from '../../prisma.service';
import { ProductRepository } from './db/product.repository';
import { ProductController } from './api/product.controller';

const Repos =
  [ProductRepository, UsersRepository, SubscriptionRepository, EmailService];
@Module({
  imports: [CqrsModule, JwtModule, ConfigModule],
  controllers: [ProductController],
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
    ...Repos,
  ],
})
export class ProductModule {}
