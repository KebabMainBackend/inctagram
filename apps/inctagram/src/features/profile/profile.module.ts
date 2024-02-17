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

const CommandHandlers = [
  UpdateProfileHandler,
  UploadAvatarHandler,
  DeleteAvatarHandler,
];
const Repos = [UsersRepository, ProfileRepository, ProfileQueryRepository];
@Module({
  imports: [CqrsModule, JwtModule],
  controllers: [ProfileController],
  providers: [PrismaService, S3StorageManager, ...Repos, ...CommandHandlers],
})
export class ProfileModule {}
