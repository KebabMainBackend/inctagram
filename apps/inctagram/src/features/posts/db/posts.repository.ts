import { Injectable } from '@nestjs/common';
import { PostEntity } from '../domain/entities/post.entity';
import { PostStatusEnum } from '../domain/types/post.enum';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class PostsRepository {
  constructor(protected prismaClient: PrismaService) {}
  async getPostById(postId: number) {
    return this.prismaClient.post.findUnique({
      where: {
        id: postId,
      },
    });
  }

  async createPost(post: PostEntity) {
    return this.prismaClient.post.create({
      data: post,
    });
  }
  async updatePost(postId: number, body: { description: string }) {
    await this.prismaClient.post.update({
      where: { id: postId },
      data: { description: body.description },
    });
  }
  async deletePost(postId: number) {
    await this.prismaClient.post.update({
      where: { id: postId },
      data: { status: PostStatusEnum.DELETED },
    });
  }
}
