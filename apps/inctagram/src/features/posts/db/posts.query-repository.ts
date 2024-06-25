import { Inject, Injectable } from '@nestjs/common';
import { mapPostsWithImages } from './view/mapPost';
import { GetDefaultUriDtoWithCursor } from '../../../utils/default-get-query.uri.dto';
import {
  getRequestQueryMapperWithCursor,
  getRequestReturnMapperWithCursor,
} from '../../../utils/helpers/get-request-mapper-helper-with.cursor';
import { PostStatusEnum } from '../domain/types/post.enum';
import { PostView } from './view/post.view';
import { FilesMicroserviceMessagesEnum } from '../../../../../../types/messages';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../../../prisma.service';

const availableQueryParams = ['createdAt', 'description', 'userId', 'id'];
@Injectable()
export class PostsQueryRepository {
  constructor(
    protected prismaClient: PrismaService,
    @Inject('FILES_SERVICE') private client: ClientProxy,
  ) {}

  async findPosts(queryPost: GetDefaultUriDtoWithCursor, userId?: number) {
    const items: PostView[] = [];
    let lastPostId = 0;
    const { pageSize, cursor, sortDirection } =
      getRequestQueryMapperWithCursor(queryPost);
    let { sortBy } = getRequestQueryMapperWithCursor(queryPost);
    let hasMore = false;
    const filterByStatusAndOptionalUserId: any = {
      status: PostStatusEnum.ACTIVE,
      user: {
        username: {
          contains: queryPost.searchTerm,
        },
      },
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
    if (postsNPostImages.length) {
      lastPostId =
        postsNPostImages.length > 2
          ? postsNPostImages.at(-2).id
          : postsNPostImages.at(-1).id;
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
      for (const post of postsNPostImages) {
        if (!userId) {
          userProfile = await this.getUserProfile(post.userId);
          userAvatar = await firstValueFrom(
            this.getUserThumbnailAvatar(userProfile?.thumbnailId),
          );
        }
        const postImages = await firstValueFrom(
          this.getPostImages(post.images),
        );
        const mappedPost = mapPostsWithImages({
          post,
          profile: userProfile,
          userAvatar: userAvatar?.url,
          postImages,
        });
        items.push(mappedPost);
      }
    }
    return getRequestReturnMapperWithCursor<PostView>({
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
          include: {
            ban: true,
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
      where: { id: postId, status: PostStatusEnum.ACTIVE },
    });
    if (post) {
      const userProfile = await this.getUserProfile(post.userId);
      console.log(userProfile);
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
    return null;
  }
}
