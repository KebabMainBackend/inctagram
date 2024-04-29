import { Injectable } from '@nestjs/common';
import { SecurityDevicesTypes } from '../types/create-device.types';
import { PrismaService } from '../../../prisma.service';
import { CreateSessionTypes } from '../types/create-session.types';

@Injectable()
export class SecurityDevicesRepository {
  constructor(private prisma: PrismaService) {}
  async createDevice(deviceBody: SecurityDevicesTypes) {
    return this.prisma.devices.create({
      data: {
        ip: deviceBody.ip,
        title: deviceBody.title,
        id: deviceBody.id,
      },
    });
  }

  async createSession(data: CreateSessionTypes) {
    const session = await this.prisma.session.create({
      data: {
        userId: data.userId,
        devicesId: data.devicesId,
        lastActiveDate: data.lastActiveDate,
        aliveTill: data.aliveTill,
      },
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
    const session = await this.prisma.session.findUnique({
      where: {
        id: sessionId,
      },
    });
    await this.prisma.session.delete({
      where: { id: sessionId },
    });
    await this.prisma.devices.delete({
      where: {
        id: session.devicesId,
      },
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
  async deleteAllDevicesOfUserExceptCurrent(userId: number, sessionId: string) {
    const sessions = await this.prisma.session.findMany({
      where: {
        id: { not: sessionId },
        userId,
      },
    });
    await this.prisma.session.deleteMany({
      where: {
        id: { in: sessions.map((s) => s.id) },
      },
    });
    await this.prisma.devices.deleteMany({
      where: {
        id: { in: sessions.map((s) => s.devicesId) },
      },
    });
  }
}
