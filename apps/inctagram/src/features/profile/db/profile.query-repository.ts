import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { mapUserProfile } from './view/mapUserProfile';

@Injectable()
export class ProfileQueryRepository {
  constructor(private prisma: PrismaService) {}

  async getUserProfile(userId: number) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        avatar: true,
      },
    });
    return mapUserProfile(profile);
  }
}
