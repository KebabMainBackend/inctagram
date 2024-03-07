import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PostEntity } from '../domain/entities/post.entity';

@Injectable()
export class PostsRepository {
  constructor(protected prismaClient: PrismaClient) {}

  async createPost(post: PostEntity) {
    await this.prismaClient.post.create({
      data: post,
    });
  }
}
