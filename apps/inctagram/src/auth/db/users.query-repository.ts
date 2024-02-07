import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UsersQueryRepository {
  constructor(private prisma: PrismaService) {}
  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  getUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  getUserByCode(code: string) {
    return this.prisma.user.findFirst({
      where: { confirmationCode: code },
    });
  }
}
