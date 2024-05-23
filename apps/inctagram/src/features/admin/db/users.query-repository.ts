import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  GetUserPaymentsQueryDto,
  GetUsersQueryDto,
} from '../api/dto/get-users.dto';
import {
  getRequestQueryMapperWithPageNumber,
  getRequestReturnMapperWithPageNumber,
} from '../../../utils/helpers/get-request-mapper-helper-with.cursor';
import { PrismaService } from '../../../prisma.service';
import {
  FilesMicroserviceMessagesEnum,
  PaymentsMicroserviceMessagesEnum,
} from '../../../../../../types/messages';
import { firstValueFrom } from 'rxjs';

const availableQueryParams = ['createdAt', 'username', 'fullName'];

@Injectable()
export class UsersQueryRepository {
  constructor(
    private prismaClient: PrismaService,
    @Inject('FILES_SERVICE') private client: ClientProxy,
    @Inject('PAYMENTS_SERVICE') private clientPayments: ClientProxy,
  ) {}

  async getAllUsers(query: GetUsersQueryDto) {
    const { pageSize, pageNumber, sortDirection } =
      getRequestQueryMapperWithPageNumber(query);
    let { sortBy } = getRequestQueryMapperWithPageNumber(query);
    const filterOptions: any = {};
    if (!availableQueryParams.includes(sortBy)) {
      sortBy = 'id';
    }
    let orderBy: any = { [sortBy]: sortDirection };
    if (sortBy === 'fullName') {
      orderBy = {
        profile: {
          firstname: sortDirection,
        },
      };
    }
    console.log(sortBy);
    if (query.searchTerm) {
      filterOptions.profile = {
        OR: [
          {
            firstname: {
              contains: query.searchTerm,
            },
          },
          { lastname: { contains: query.searchTerm } },
        ],
      };
    }
    const totalCount = await this.prismaClient.user.count({
      where: filterOptions,
    });

    const users = await this.prismaClient.user.findMany({
      where: filterOptions,
      include: {
        profile: true,
      },
      orderBy: orderBy,
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
    });

    return {
      pagination: getRequestReturnMapperWithPageNumber<any>({
        totalCount,
        items: users,
        pageSize,
        pageNumber,
      }),
      users: users.map((u) => this.mapUsers(u)),
    };
  }
  async getUser(id: number) {
    const user = await this.prismaClient.profile.findUnique({
      where: {
        userId: id,
      },
      include: {
        user: true,
      },
    });
    return this.mapUser(user);
  }
  async getUserPayments(id: number, query: GetUserPaymentsQueryDto) {
    const pattern = { cmd: PaymentsMicroserviceMessagesEnum.GET_USER_PAYMENTS };
    const payload = {
      userId: id,
      query: {
        pageSize: query.pageSize,
        pageNumber: query.pageNumber,
      },
    };
    return this.clientPayments.send(pattern, payload);
  }
  async getUserPhotos(id: number) {
    const pattern = { cmd: FilesMicroserviceMessagesEnum.GET_USER_ALL_PHOTOS };
    const payload = {
      ownerId: id,
    };
    return await firstValueFrom(this.client.send(pattern, payload));
  }
  getUserProfileImages(userId: number) {
    const pattern = { cmd: FilesMicroserviceMessagesEnum.GET_AVATAR };
    const payload = {
      ownerId: userId,
    };
    return this.client.send(pattern, payload);
  }
  private mapUsers(user: any) {
    return {
      id: user.id,
      username: user.username,
      fullName: user.profile.firstname
        ? user.profile.firstname + ' ' + user.profile.lastname
        : null,
      createdAt: user.createdAt,
      email: user.email,
    };
  }
  private async mapUser(profile: any) {
    const obj = {};
    const fileImage = await firstValueFrom(
      this.getUserProfileImages(profile.userId),
    );
    fileImage.forEach((x) => {
      obj[x.type.split('avatar-')[1]] = {
        url: 'https://storage.yandexcloud.net/kebab-inctagram/' + x.url,
        width: x.width,
        height: x.height,
        fileSize: x.fileSize,
      };
    });
    return {
      id: profile.userId,
      username: profile.user.username,
      firstname: profile.firstname,
      lastname: profile.lastname,
      city: profile.city,
      birthDate: profile.birthDate,
      aboutMe: profile.aboutMe,
      createdAt: profile.createdAt,
      accountType: profile.accountType,
      avatars: obj,
    };
  }
}
