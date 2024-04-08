import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { mapUserProfile } from './view/mapUserProfile';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceMessagesEnum } from '../../../../../../types/messages';
import { firstValueFrom } from 'rxjs';
import { PostStatusEnum } from '../../posts/domain/types/post.enum';

@Injectable()
export class ProfileQueryRepository {
  constructor(
    private prisma: PrismaService,
    @Inject('FILES_SERVICE') private client: ClientProxy,
  ) {}
  async getAllUsersCount() {
    const total = await this.prisma.profile.count({});
    const lastUser = await this.prisma.profile.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    return { totalUsersCount: total, lastUserId: lastUser.userId };
  }

  async getUserProfile(userId: number) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    const fileImage = await firstValueFrom(this.getUserProfileImages(userId));
    return mapUserProfile(profile, fileImage);
  }
  async getUserPublicProfile(userId: number) {
    const publicUser = await this.getUserProfile(userId);
    const postsCount = await this.prisma.post.count({
      where: {
        userId,
        status: PostStatusEnum.ACTIVE,
      },
    });
    return {
      id: publicUser.id,
      username: publicUser.username,
      aboutMe: publicUser.aboutMe,
      avatars: publicUser.avatars,
      following: 0,
      followers: 0,
      posts: postsCount,
    };
  }
  private getUserProfileImages(userId: number) {
    const pattern = { cmd: MicroserviceMessagesEnum.GET_AVATAR };
    const payload = {
      ownerId: userId,
    };
    return this.client.send(pattern, payload);
  }
}
