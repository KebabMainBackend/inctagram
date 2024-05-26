import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}
  async deleteUserById(userId: number) {
    await this.prisma.subscription.deleteMany({
      where: { userId },
    });
    await this.prisma.payments.deleteMany({
      where: { userId },
    });
    await this.prisma.post.deleteMany({
      where: { userId },
    });
    await this.prisma.oAuthProvider.deleteMany({
      where: { userId },
    });
    await this.prisma.user.delete({
      where: { id: userId },
    });
    await this.prisma.session.deleteMany({
      where: { userId },
    });
    await this.prisma.userConfirmation.delete({
      where: { userId },
    });
    await this.prisma.currentSubscription.delete({
      where: { userId },
    });
    await this.prisma.profile.delete({
      where: { userId },
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
