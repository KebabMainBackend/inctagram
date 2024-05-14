import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
type DeviceType = {
  deviceId: string;
  title: string;
  lastActiveDate: Date;
  ip: string;
};
@Injectable()
export class SecurityDevicesQueryRepository {
  constructor(private prisma: PrismaService) {}
  async getAllDevicesOfUser(userId: number, sessionId: string) {
    const sessions = await this.prisma.session.findMany({
      where: {
        userId,
      },
      include: {
        device: true,
      },
    });
    if (sessions.length) {
      let currentDevice: DeviceType;
      const devices: DeviceType[] = [];
      for (const s of sessions) {
        if (s.id === sessionId) {
          currentDevice = {
            deviceId: s.devicesId,
            title: s.device.title,
            lastActiveDate: s.lastActiveDate,
            ip: s.device.ip,
          };
        } else {
          devices.push({
            deviceId: s.devicesId,
            title: s.device.title,
            lastActiveDate: s.lastActiveDate,
            ip: s.device.ip,
          });
        }
      }
      return { current: currentDevice, others: devices };
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

  async getSessionByDevice(deviceId: string) {
    return this.prisma.session.findUnique({
      where: {
        devicesId: deviceId,
      },
    });
  }

  async getBlackList(refresh: string) {
    return this.prisma.blacklist.findUnique({
      where: { refreshToken: refresh },
    });
  }
}
