import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class SecurityDevicesQueryRepository {
  constructor(private prisma: PrismaService) {}
  async getAllDevicesOfUser(userId: number) {
    const sessions = await this.prisma.session.findMany({
      where: {
        userId,
      },
      include: {
        device: true,
      },
    });
    console.log(sessions);
    if (sessions.length) {
      return sessions.map((s) => ({
        deviceId: s.devicesId,
        title: s.device.title,
        lastActiveDate: s.lastActiveDate,
        ip: s.device.ip,
      }));
    }
    return null;
  }
  getSessionByUserIdAndSessionId(sessionId: string, userId: number) {
    return this.prisma.session.findUnique({
      where: {
        id: sessionId,
        userId,
      },
    });
  }
  async getDeviceById(deviceId: string) {
    return this.prisma.devices.findUnique({
      where: {
        id: deviceId,
      },
      include: {
        session: true,
      },
    });
  }
  async getBlackList(refresh: string) {
    return this.prisma.blacklist.findUnique({
      where: { refreshToken: refresh },
    });
  }
}
