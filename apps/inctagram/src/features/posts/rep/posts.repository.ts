import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { GetPostsUriInputModel } from '../utils/models/input/get-posts.uri.input-model';
import { PAGE_SIZE_DEFAULT, SortDirection } from '../../../utils/constants';

interface IPostNPostImage {
  id: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  postImages: string[];
}

@Injectable()
export class PostsQueryRepository {
  constructor(protected prismaClient: PrismaClient) {}

  async findPosts(queryPost: GetPostsUriInputModel, userId?: string) {
    const count = Number(queryPost.pageSize) || PAGE_SIZE_DEFAULT;
    const sortBy = queryPost.sortBy || '';
    const sortDirection = queryPost.sortDirection || SortDirection.Desc;

    const totalCount = await this.prismaClient.post.count();
    const postsNPostImages: any = await this.prismaClient.post.findMany({
      where: { id: +userId },
      take: count,
      skip: 1,
      cursor: queryPost.cursor ? { id: +queryPost.cursor } : undefined,
      orderBy: { [sortBy]: sortDirection },
    });

    const cursor = postsNPostImages[count - 1].id;

    const outputView = this.mapPostsNPostImages(postsNPostImages);

    return {
      pageSize: count,
      totalCount: Number(totalCount),
      items: outputView,
      cursor: cursor,
    };
  }

  private mapPostsNPostImages(data: IPostNPostImage[]) {
    return data.map((i) => ({
      id: i.id,
      description: i.description,

      createdAt: i.createdAt,
      updatedAt: i.updatedAt,
      ownerId: i.userId,
    }));
  }
}
