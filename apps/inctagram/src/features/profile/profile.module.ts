import { Module } from '@nestjs/common';
import { ProfileController } from './api/profile.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from '../../auth/db/users.repository';
import { PrismaService } from '../../prisma.service';
import { ProfileRepository } from './db/profile.repository';
import { ProfileQueryRepository } from './db/profile.query-repository';
import { UpdateProfileHandler } from './application/use-cases/update-profile.command';

const CommandHandlers = [UpdateProfileHandler];
const Repos = [UsersRepository, ProfileRepository, ProfileQueryRepository];
@Module({
  imports: [CqrsModule, JwtModule],
  controllers: [ProfileController],
  providers: [PrismaService, ...Repos, ...CommandHandlers],
})
export class ProfileModule {}
