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
import { S3StorageManager } from './managers/s3-storage.manager';
import { DeleteAvatarHandler } from './application/use-cases/delete-avatar.command';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
          port: 3001,
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
  providers: [PrismaService, S3StorageManager, ...Repos, ...CommandHandlers],
})
export class ProfileModule {}
