import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { PostsController } from './api/posts.controller';
import { UsersRepository } from '../../auth/db/users.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PostsQueryRepository } from './db/posts.query-repository';
import { UploadPostImagesHandler } from './application/use-cases/upload-post-images.command';

const CommandHandlers = [UploadPostImagesHandler];

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: 'FILES_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.FILES_SERVICE_HOST || '0.0.0.0',
          // host: process.env.FILES_SERVICE_HOST || 'files-service-service',
          port: Number(process.env.FILES_SERVICE_PORT || 3262),
        },
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [
    PostsQueryRepository,
    UsersRepository,
    PrismaClient,
    PrismaService,
    JwtService,
    ConfigService,
    ...CommandHandlers,
  ],
})
export class PostsModule {}
