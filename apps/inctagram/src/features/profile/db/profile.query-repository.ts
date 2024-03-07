import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { mapUserProfile } from './view/mapUserProfile';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceMessagesEnum } from '../../../../../../types/messages';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProfileQueryRepository {
  constructor(
    private prisma: PrismaService,
    @Inject('FILES_SERVICE') private client: ClientProxy,
  ) {}

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
  private getUserProfileImages(userId: number) {
    const pattern = { cmd: MicroserviceMessagesEnum.GET_AVATAR };
    const payload = {
      ownerId: userId,
    };
    return this.client.send(pattern, payload);
  }
}
