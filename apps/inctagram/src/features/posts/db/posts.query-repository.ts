import { PrismaClient } from '@prisma/client';
import { Inject, Injectable } from '@nestjs/common';
import { mapPostsWithImages } from './view/mapPost';
import { GetDefaultUriDto } from '../../../utils/default-get-query.uri.dto';
import {
  getRequestQueryMapper,
  getRequestReturnMapper,
} from '../../../utils/helpers/get-request-mapper.helper';
import { PostStatusEnum } from '../domain/types/post.enum';
import { PostView } from './view/post.view';
import { MicroserviceMessagesEnum } from '../../../../../../types/messages';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PostsQueryRepository {
  constructor(
    protected prismaClient: PrismaClient,
    @Inject('FILES_SERVICE') private client: ClientProxy,
  ) {}

  async findPosts(queryPost: GetDefaultUriDto, userId?: number) {
    const { pageSize, cursor, sortBy, sortDirection } =
      getRequestQueryMapper(queryPost);
    const filter: any = {
      where: { userId, status: PostStatusEnum.ACTIVE },
      take: pageSize,
      orderBy: { [sortBy]: sortDirection },
    };
    if (cursor) {
      filter.skip = 1;
      filter.cursor = { id: Number(cursor) };
    }
    const totalCount = await this.prismaClient.post.count({
      where: {
        status: PostStatusEnum.ACTIVE,
        userId,
      },
    });

    const postsNPostImages = await this.prismaClient.post.findMany(filter);
    const lastPostId = postsNPostImages.length ? postsNPostImages.at(-1).id : 0;
    const userProfile = await this.getUserProfile(userId);
    const userAvatar = await firstValueFrom(
      this.getUserThumbnailAvatar(userProfile.thumbnailId),
    );
    const items: PostView[] = [];
    for (const post of postsNPostImages) {
      const postImages = await firstValueFrom(this.getPostImages(post.images));
      const mappedPost = mapPostsWithImages({
        post,
        profile: userProfile,
        userAvatar: userAvatar.url,
        postImages,
      });
      items.push(mappedPost);
    }
    return getRequestReturnMapper<PostView>({
      totalCount,
      items,
      cursor: lastPostId,
      pageSize,
    });
  }
  private getUserProfile(userId: number) {
    return this.prismaClient.profile.findUnique({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
  }
  private getUserThumbnailAvatar(imageId: string) {
    const pattern = { cmd: MicroserviceMessagesEnum.GET_USER_THUMBNAIL_AVATAR };
    const payload = {
      imageId,
    };
    return this.client.send(pattern, payload);
  }
  private getPostImages(imagesIds: string[]) {
    const pattern = { cmd: MicroserviceMessagesEnum.GET_POST_IMAGES };
    const payload = {
      imagesIds,
    };
    return this.client.send(pattern, payload);
  }
}
