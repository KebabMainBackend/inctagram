import { add } from 'date-fns';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { SecurityDevicesRepository } from '../../features/security-devices/db/security-devices.repository';

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
    const currentTime = new Date();
    const token = await this.jwtService.signAsync(
      { userId: userId, deviceId: currentTime.getTime().toString() },
      { expiresIn: 20, secret: process.env.JWT_REFRESH_KEY },
    );
    const deviceBody = {
      title: deviceTitle,
      deviceId: currentTime.getTime().toString(),
      lastActiveDate: currentTime.toISOString(),
      userId,
      ip: deviceIp,
      aliveTill: add(currentTime, { minutes: 15 }).toISOString(),
    };
    await this.securityDevicesRepository.createDevice(deviceBody);

    return token;
  }
}
