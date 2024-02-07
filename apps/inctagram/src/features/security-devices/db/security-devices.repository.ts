import { Injectable } from '@nestjs/common';
import { SecurityDevicesTypes } from '../types/create-device.types';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class SecurityDevicesRepository {
  constructor(private prisma: PrismaService) {}
  async createDevice(deviceBody: SecurityDevicesTypes) {
    return this.prisma.devices.create({
      data: deviceBody,
    });
  }
  async updateLastActiveDateOfDevice(
    deviceId: string,
    newDate: string,
    aliveTill: string,
  ) {
    this.prisma.devices.update({
      where: {
        deviceId: deviceId,
      },
      data: {
        lastActiveDate: newDate,
        aliveTill: aliveTill,
      },
    });
  }
  deleteDeviceById(deviceId: string) {
    this.prisma.devices.delete({
      where: { deviceId },
    });
  }
  async addTokenToBlacklist(refreshToken: string) {
    await this.prisma.blacklist.create({
      data: {
        refreshToken,
      },
    });
  }
}
