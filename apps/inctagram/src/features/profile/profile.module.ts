import { Module } from '@nestjs/common';
import { ProfileController } from './api/profile.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from '../../auth/db/users.repository';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [CqrsModule, JwtModule],
  controllers: [ProfileController],
  providers: [UsersRepository, PrismaService],
})
export class ProfileModule {}
