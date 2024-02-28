import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class SecurityDevicesQueryRepository {
  constructor(private prisma: PrismaService) {}
  async getDeviceByUserIdAndDeviceId(deviceId: string, userId: number) {
    const device = await this.prisma.devices.findUnique({
      where: {
        deviceId,
        userId,
      },
    });

    if (device) {
      return device;
    }
    return null;
  }
  async getBlackList(refresh: string) {
    return this.prisma.blacklist.findUnique({
      where: { refreshToken: refresh },
    });
  }
}
