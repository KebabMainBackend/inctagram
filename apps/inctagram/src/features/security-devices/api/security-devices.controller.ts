import {
  Controller,
  Get,
  Param,
  Delete,
  Req,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Request } from 'express';
import { SecurityDevicesQueryRepository } from '../db/security-devices.query-repository';
import { DecodeRefreshTokenCommand } from '../../../auth/application/use-cases/decode-refresh-token.command';
import { DeleteDeviceCommand } from '../app/commands/delete-device.command';
import { DeleteAllDevicesCommand } from '../app/commands/delete-all-devices.command';

@Controller('devices')
export class SecurityDevicesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly securityDevicesQueryRepository: SecurityDevicesQueryRepository,
  ) {}

  @Get()
  async getAllDevices(@Req() req: Request) {
    const refreshToken = req.cookies.refreshToken;
    const data = await this.commandBus.execute(
      new DecodeRefreshTokenCommand(refreshToken),
    );
    if (data) {
      return this.securityDevicesQueryRepository.getAllDevicesOfUser(
        data.userId,
        data.sessionId,
      );
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  @Delete('')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAll(@Req() req: Request) {
    const refreshToken = req.cookies.refreshToken;
    const data = await this.commandBus.execute(
      new DecodeRefreshTokenCommand(refreshToken),
    );
    if (data) {
      await this.commandBus.execute(
        new DeleteAllDevicesCommand(data.userId, data.sessionId),
      );
      return;
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  @Delete(':deviceId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDeviceById(
    @Req() req: Request,
    @Param('deviceId') deviceId: string,
  ) {
    const refreshToken = req.cookies.refreshToken;
    const data = await this.commandBus.execute(
      new DecodeRefreshTokenCommand(refreshToken),
    );
    const session =
      await this.securityDevicesQueryRepository.getSessionByDevice(deviceId);
    if (data) {
      if (session) {
        if (session.id !== data.sessionId) {
          await this.commandBus.execute(new DeleteDeviceCommand(session.id));
          return;
        }
        throw new HttpException('Forbidden request', HttpStatus.FORBIDDEN);
      }
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Unauthorized request', HttpStatus.UNAUTHORIZED);
  }
}
