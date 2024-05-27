import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}
  async deleteUserById(userId: number) {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
  getUserById(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }
  getUsersTotalCount() {
    return this.prisma.user.count();
  }
}
