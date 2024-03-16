import { Module } from '@nestjs/common';
import { ProfileController } from './api/profile.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from '../../auth/db/users.repository';
import { PrismaService } from '../../prisma.service';
import { ProfileRepository } from './db/profile.repository';
import { ProfileQueryRepository } from './db/profile.query-repository';
import { UpdateProfileHandler } from './application/use-cases/update-profile.command';
import { UploadAvatarHandler } from './application/use-cases/upload-avatar.command';
import { DeleteAvatarHandler } from './application/use-cases/delete-avatar.command';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TcpClientOptions } from '@nestjs/microservices/interfaces/client-metadata.interface';

const CommandHandlers = [
  UpdateProfileHandler,
  UploadAvatarHandler,
  DeleteAvatarHandler,
];
const Repos = [UsersRepository, ProfileRepository, ProfileQueryRepository];
@Module({
  imports: [CqrsModule, JwtModule, ConfigModule],
  controllers: [ProfileController],
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
    ...CommandHandlers,
  ],
})
export class ProfileModule {}
