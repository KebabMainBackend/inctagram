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
import { FilesMicroserviceMessagesEnum } from '../../../../../../types/messages';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
const availableQueryParams = ['createdAt', 'description', 'userId', 'id'];
@Injectable()
export class PostsQueryRepository {
  constructor(
    protected prismaClient: PrismaClient,
    @Inject('FILES_SERVICE') private client: ClientProxy,
  ) {}

  async findPosts(queryPost: GetDefaultUriDto, userId?: number) {
    const { pageSize, cursor, sortDirection } =
      getRequestQueryMapper(queryPost);
    let { sortBy } = getRequestQueryMapper(queryPost);
    let hasMore = false;
    const filterByStatusAndOptionalUserId: any = {
      status: PostStatusEnum.ACTIVE,
    };
    if (!availableQueryParams.includes(sortBy)) {
      sortBy = 'createdAt';
    }
    if (userId) {
      filterByStatusAndOptionalUserId.userId = userId;
    }
    const filter: any = {
      where: filterByStatusAndOptionalUserId,
      take: pageSize + 1,
      orderBy: { [sortBy]: sortDirection },
    };
    if (cursor) {
      filter.skip = 1;
      filter.cursor = { id: Number(cursor) };
    }
    const totalCount = await this.prismaClient.post.count({
      where: filterByStatusAndOptionalUserId,
    });

    const postsNPostImages = await this.prismaClient.post.findMany(filter);
    const lastPostId = postsNPostImages.length ? postsNPostImages.at(-2).id : 0;
    let userProfile;
    let userAvatar;
    if (userId) {
      userProfile = await this.getUserProfile(userId);
      userAvatar = await firstValueFrom(
        this.getUserThumbnailAvatar(userProfile?.thumbnailId),
      );
    }
    if (postsNPostImages.length > pageSize) {
      hasMore = true;
      postsNPostImages.pop(); // Remove the extra post used to check for more
    }
    const items: PostView[] = [];
    for (const post of postsNPostImages) {
      if (!userId) {
        userProfile = await this.getUserProfile(post.userId);
        userAvatar = await firstValueFrom(
          this.getUserThumbnailAvatar(userProfile?.thumbnailId),
        );
      }
      const postImages = await firstValueFrom(this.getPostImages(post.images));
      const mappedPost = mapPostsWithImages({
        post,
        profile: userProfile,
        userAvatar: userAvatar?.url,
        postImages,
      });
      items.push(mappedPost);
    }
    return getRequestReturnMapper<PostView>({
      totalCount,
      items,
      cursor: lastPostId,
      pageSize,
      hasMore,
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
    const pattern = {
      cmd: FilesMicroserviceMessagesEnum.GET_USER_THUMBNAIL_AVATAR,
    };
    const payload = {
      imageId,
    };
    return this.client.send(pattern, payload);
  }
  private getPostImages(imagesIds: string[]) {
    const pattern = { cmd: FilesMicroserviceMessagesEnum.GET_POST_IMAGES };
    const payload = {
      imagesIds,
    };
    return this.client.send(pattern, payload);
  }
  async getPostById(postId: number) {
    const post = await this.prismaClient.post.findUnique({
      where: { id: postId },
    });
    const userProfile = await this.getUserProfile(post.userId);
    const userAvatar = await firstValueFrom(
      this.getUserThumbnailAvatar(userProfile?.thumbnailId),
    );
    const postImages = await firstValueFrom(this.getPostImages(post.images));
    return mapPostsWithImages({
      post,
      profile: userProfile,
      userAvatar: userAvatar?.url,
      postImages,
    });
  }
}
