import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GetUsersQueryDto } from '../api/dto/get-users.dto';
import { PostView } from '../../posts/db/view/post.view';
import {
  getRequestQueryMapperWithPageNumber,
  getRequestReturnMapperWithPageNumber,
} from '../../../utils/helpers/get-request-mapper-helper-with.cursor';
import { firstValueFrom } from 'rxjs';
import { mapPostsWithImages } from '../../posts/db/view/mapPost';
import { PrismaService } from '../../../prisma.service';
import { FilesMicroserviceMessagesEnum } from '../../../../../../types/messages';

const availableQueryParams = ['createdAt', 'username'];

@Injectable()
export class UsersQueryRepository {
  constructor(
    private prismaClient: PrismaService,
    @Inject('FILES_SERVICE') private client: ClientProxy,
  ) {}

  async getAllUsers(query: GetUsersQueryDto) {
    const items: PostView[] = [];
    const { pageSize, pageNumber, sortDirection } =
      getRequestQueryMapperWithPageNumber(query);
    let { sortBy } = getRequestQueryMapperWithPageNumber(query);
    const filterOptions: any = {};
    if (!availableQueryParams.includes(sortBy)) {
      sortBy = 'createdAt';
    }
    if (query.searchTerm) {
      filterOptions.username = {
        contains: query.searchTerm,
      };
    }
    const totalCount = await this.prismaClient.post.count({
      where: filterOptions,
    });

    const users = await this.prismaClient.user.findMany({
      where: filterOptions,
      include: {
        profile: true,
      },
      take: pageSize + 1,
      orderBy: { [sortBy]: sortDirection },
    });
    if (users.length) {
      let userProfile;
    }

    return getRequestReturnMapperWithPageNumber<PostView>({
      totalCount,
      items,
      pageSize,
      pageNumber,
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
}
