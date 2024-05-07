import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GetUsersQueryDto } from '../api/dto/get-users.dto';
import {
  getRequestQueryMapperWithPageNumber,
  getRequestReturnMapperWithPageNumber,
} from '../../../utils/helpers/get-request-mapper-helper-with.cursor';
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
    console.log(users);

    return {
      pagination: getRequestReturnMapperWithPageNumber<any>({
        totalCount,
        items: users,
        pageSize,
        pageNumber,
      }),
      users: users.map((u) => this.mapUser(u)),
    };
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
  private mapUser(user: any) {
    return {
      id: user.id,
      username: user.username,
      fullName: user.profile.firstname + ' ' + user.profile.lastname,
      createdAt: user.createdAt,
    };
  }
}
