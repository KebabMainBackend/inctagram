import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { BanStatus } from '../../../types/ban.types';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}
  async deleteUserById(userId: number) {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
  async getUserById(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }
  getUsersTotalCount() {
    return this.prisma.user.count();
  }
  async changeBanStatusOfUser(
    userId: number,
    status: BanStatus,
    banReason: string,
  ) {
    await this.prisma.bans.update({
      where: {
        userId,
      },
      data: {
        banStatus: status,
        banReason,
      },
    });
  }
}
