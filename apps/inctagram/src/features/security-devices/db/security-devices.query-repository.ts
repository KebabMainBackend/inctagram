import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class SecurityDevicesQueryRepository {
  constructor(private prisma: PrismaService) {}
  getSessionByUserIdAndSessionId(sessionId: number, userId: number) {
    return this.prisma.session.findUnique({
      where: {
        id: sessionId,
        userId,
      },
    });
  }
  async getBlackList(refresh: string) {
    return this.prisma.blacklist.findUnique({
      where: { refreshToken: refresh },
    });
  }
}
