import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { SecurityDevicesRepository } from '../../../features/security-devices/db/security-devices.repository';
import {
  DeviceEntity,
  SessionEntity,
} from '../../domain/entities/session.entity';

export class CreateRefreshTokenCommand {
  constructor(
    public userId: number,
    public deviceTitle: string,
    public deviceIp: string,
  ) {}
}

@CommandHandler(CreateRefreshTokenCommand)
export class CreateRefreshTokenHandler
  implements ICommandHandler<CreateRefreshTokenCommand>
{
  constructor(
    private jwtService: JwtService,
    private securityDevicesRepository: SecurityDevicesRepository,
  ) {}
  async execute({ userId, deviceTitle, deviceIp }: CreateRefreshTokenCommand) {
    const device = DeviceEntity.create({
      title: deviceTitle,
      ip: deviceIp,
    });
    const newDevice = await this.securityDevicesRepository.createDevice(device);
    const session = SessionEntity.create(userId, newDevice.deviceId);
    const sessionId = await this.securityDevicesRepository.createSession(
      session,
    );
    return await this.jwtService.signAsync(
      { userId, sessionId },
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
        secret: process.env.JWT_REFRESH_KEY,
      },
    );
  }
}
