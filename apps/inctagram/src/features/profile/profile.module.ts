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
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as process from 'process';

const CommandHandlers = [
  UpdateProfileHandler,
  UploadAvatarHandler,
  DeleteAvatarHandler,
];
const Repos = [UsersRepository, ProfileRepository, ProfileQueryRepository];
@Module({
  imports: [
    CqrsModule,
    JwtModule,
    ClientsModule.register([
      {
        name: 'FILES_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.FILES_SERVICE_HOST,
          port: Number(process.env.FILES_SERVICE_PORT || 3261),
        },
        // options: {
        //   urls: [
        //     process.env.AMQP_RABBIT,
        //   ],
        //   queue: process.env.QUEUE_NAME,
        //   queueOptions: {
        //     durable: false,
        //   },
        // },
      },
    ]),
  ],
  controllers: [ProfileController],
  providers: [PrismaService, ...Repos, ...CommandHandlers],
})
export class ProfileModule {}
