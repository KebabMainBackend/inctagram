import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { DomainProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileRepository {
  constructor(private prisma: PrismaService) {}
  getUserProfile(userId: number) {
    return this.prisma.profile.findUnique({
      where: { userId },
    });
  }

  async getUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }
  async addAvatarToProfile(
    avatarId: string,
    thumbnailId: string,
    userId: number,
  ) {
    await this.prisma.profile.update({
      where: {
        userId,
      },
      data: {
        avatarId,
        thumbnailId,
      },
    });
  }
  async removeAvatarFromProfile(userId: number) {
    await this.prisma.profile.update({
      where: { userId },
      data: { avatarId: null, thumbnailId: null },
    });
  }

  updateUserUsername(username: string, userId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { username },
    });
  }

  async updateProfile(userId: number, data: DomainProfileDto) {
    await this.prisma.profile.update({
      where: { userId },
      data,
    });
  }
}
