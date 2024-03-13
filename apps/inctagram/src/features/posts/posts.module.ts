import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { PostsController } from './api/posts.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PostsQueryRepository } from './db/posts.query-repository';
import { UploadPostImagesHandler } from './application/use-cases/upload-post-images.command';
import { CreatePostHandler } from './application/use-cases/create-post.command';
import { PostsRepository } from './db/posts.repository';
import { ProfileRepository } from '../profile/db/profile.repository';
import { DeletePostHandler } from './application/use-cases/delete-post.command';
import { UpdatePostHandler } from './application/use-cases/update-post.command';
import { UsersRepository } from '../../auth/db/users.repository';

const CommandHandlers = [
  UploadPostImagesHandler,
  CreatePostHandler,
  DeletePostHandler,
  UpdatePostHandler,
];

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
    PostsRepository,
    ProfileRepository,
    UsersRepository,
    PrismaClient,
    PrismaService,
    JwtService,
    ConfigService,
    ...CommandHandlers,
  ],
})
export class PostsModule {}
