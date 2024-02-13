import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UsersQueryRepository {
  constructor(private prisma: PrismaService) {}
  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { providers: true, confirmationData: true },
    });
  }
  getUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  getUserByCode(code: string) {
    return this.prisma.user.findFirst({
      where: {
        confirmationData: { confirmationCode: code },
      },
      include: {
        providers: true,
        confirmationData: true,
      },
    });
  }
  getUserById(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }
  getUserProviderByIdAndType(providerId: string, providerType: string) {
    return this.prisma.oAuthProvider.findFirst({
      where: {
        providerId,
        providerType,
      },
    });
  }
}
