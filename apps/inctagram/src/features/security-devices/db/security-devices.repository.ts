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
    sessionId: string,
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
  async deleteSessionById(sessionId: string) {
    await this.prisma.session.delete({
      where: { id: sessionId },
    });
  }
  getSession(sessionId: string) {
    return this.prisma.session.findUnique({
      where: { id: sessionId },
      include: { device: true },
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
