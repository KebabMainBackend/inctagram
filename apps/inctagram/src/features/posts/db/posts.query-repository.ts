import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { GetPostsUriDto } from '../api/dto/get-posts.uri.dto';
import {
  PAGE_SIZE_DEFAULT,
  SortDirection,
} from '../../../utils/constants/default-query-params';
import { mapPostsNPostImages } from './view/mapPost';

@Injectable()
export class PostsQueryRepository {
  constructor(protected prismaClient: PrismaClient) {}

  async findPosts(queryPost: GetPostsUriDto, userId?: number) {
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

    const outputView = mapPostsNPostImages(postsNPostImages);

    return {
      pageSize: count,
      totalCount: Number(totalCount),
      items: outputView,
      cursor: cursor,
    };
  }
}
