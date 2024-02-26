import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { DomainProfileDto } from './dto/profile.dto';
import { FileImageEntity } from '../domain/entities/file-image.entity';

@Injectable()
export class ProfileRepository {
  constructor(private prisma: PrismaService) {}
  getUserProfile(userId: number) {
    return this.prisma.profile.findUnique({
      where: { userId },
      include: {
        avatar: {
          select: {
            url: true,
          },
        },
      },
    });
  }
  getUserFileImage(userId: number) {
    return this.prisma.fileImage.findUnique({
      where: {
        profileUserId: userId,
      },
    });
  }

  async getUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
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
  async createProfileAvatar(data: FileImageEntity) {
    await this.prisma.fileImage.create({
      data,
    });
  }
  async deleteProfileAvatar(url: string) {
    await this.prisma.fileImage.delete({
      where: {
        url,
      },
    });
  }
  deleteProfile(userId: number) {
    this.prisma.profile.delete({
      where: { userId },
    });
  }
}
