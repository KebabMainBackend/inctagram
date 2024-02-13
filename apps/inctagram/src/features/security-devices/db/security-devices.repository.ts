import { Injectable } from '@nestjs/common';
import { SecurityDevicesTypes } from '../types/create-device.types';
import { PrismaService } from '../../../prisma.service';
import { CreateSessionTypes } from '../types/create-session.types';

@Injectable()
export class SecurityDevicesRepository {
  constructor(private prisma: PrismaService) {}
  async createDevice(deviceBody: SecurityDevicesTypes) {
    return this.prisma.devices.create({
      data: deviceBody,
    });
  }

  async createSession(data: CreateSessionTypes) {
    const session = await this.prisma.session.create({
      data,
    });
    return session.id;
  }
  async updateLastActiveDateOfSession(
    sessionId: number,
    newDate: string,
    aliveTill: string,
  ) {
    this.prisma.session.update({
      where: {
        id: sessionId,
      },
      data: {
        lastActiveDate: newDate,
        aliveTill: aliveTill,
      },
    });
  }
  deleteSessionById(sessionId: number) {
    this.prisma.session.delete({
      where: { id: sessionId },
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
