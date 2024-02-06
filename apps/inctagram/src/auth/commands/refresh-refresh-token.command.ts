import { add } from 'date-fns';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { SecurityDevicesRepository } from '../../features/security-devices/db/security-devices.repository';

export class RefreshRefreshTokenCommand {
  constructor(
    public oldRefresh: {
      userId: number;
      deviceId: string;
    },
  ) {}
}

@CommandHandler(RefreshRefreshTokenCommand)
export class RefreshAccessTokenHandler
  implements ICommandHandler<RefreshRefreshTokenCommand>
{
  constructor(
    private jwtService: JwtService,
    private securityDevicesRepository: SecurityDevicesRepository,
  ) {}
  async execute({ oldRefresh }: RefreshRefreshTokenCommand) {
    const currentTime = new Date();
    const aliveTill = add(currentTime, { minutes: 15 }).toISOString();
    const token = await this.jwtService.signAsync(
      {
        userId: oldRefresh.userId,
        deviceId: oldRefresh.deviceId,
      },
      { expiresIn: 20, secret: process.env.JWT_REFRESH_KEY },
    );
    await this.securityDevicesRepository.updateLastActiveDateOfDevice(
      oldRefresh.deviceId,
      currentTime.toISOString(),
      aliveTill,
    );
    return token;
  }
}
