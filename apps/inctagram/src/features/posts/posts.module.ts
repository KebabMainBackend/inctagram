import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { PostsController } from './api/posts.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PostsQueryRepository } from './db/posts.query-repository';
import { UploadPostImagesHandler } from './application/use-cases/upload-post-images.command';
import { CreatePostHandler } from './application/use-cases/create-post.command';
import { PostsRepository } from './db/posts.repository';
import { ProfileRepository } from '../profile/db/profile.repository';
import { DeletePostHandler } from './application/use-cases/delete-post.command';
import { UpdatePostHandler } from './application/use-cases/update-post.command';
import { UsersRepository } from '../../auth/db/users.repository';
import { TcpClientOptions } from '@nestjs/microservices/interfaces/client-metadata.interface';

const CommandHandlers = [
  UploadPostImagesHandler,
  CreatePostHandler,
  DeletePostHandler,
  UpdatePostHandler,
];

const Repos = [
  PostsQueryRepository,
  PostsRepository,
  ProfileRepository,
  UsersRepository,
];

@Module({
  imports: [CqrsModule, ConfigModule],
  controllers: [PostsController],
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

    PrismaClient,
    PrismaService,
    JwtService,
    ConfigService,
    ...CommandHandlers,
    ...Repos,
  ],
})
export class PostsModule {}
