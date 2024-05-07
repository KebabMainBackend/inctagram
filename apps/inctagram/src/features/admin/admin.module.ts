import { Module } from '@nestjs/common';
import { AdminResolver } from './api/admin.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersQueryRepository } from './db/users.query-repository';
import { PrismaService } from '../../prisma.service';
import { ConfigService } from '@nestjs/config';
import { TcpClientOptions } from '@nestjs/microservices/interfaces/client-metadata.interface';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

const repos = [UsersQueryRepository];
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
    PrismaService,
    AdminResolver,
    ...repos,
  ],
})
export class AdminModule {}
