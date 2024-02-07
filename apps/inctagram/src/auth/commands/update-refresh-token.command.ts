import { add } from 'date-fns';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { SecurityDevicesRepository } from '../../features/security-devices/db/security-devices.repository';

export class UpdateRefreshTokenCommand {
  constructor(
    public oldRefresh: {
      userId: number;
      deviceId: string;
    },
  ) {}
}

@CommandHandler(UpdateRefreshTokenCommand)
export class UpdateRefreshTokenHandler
  implements ICommandHandler<UpdateRefreshTokenCommand>
{
  constructor(
    private jwtService: JwtService,
    private securityDevicesRepository: SecurityDevicesRepository,
  ) {}
  async execute({ oldRefresh }: UpdateRefreshTokenCommand) {
    const currentTime = new Date();
    const aliveTill = add(currentTime, { minutes: 15 }).toISOString();
    const token = await this.jwtService.signAsync(
      {
        userId: oldRefresh.userId,
        deviceId: oldRefresh.deviceId,
      },
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
        secret: process.env.JWT_REFRESH_KEY,
      },
    );
    await this.securityDevicesRepository.updateLastActiveDateOfDevice(
      oldRefresh.deviceId,
      currentTime.toISOString(),
      aliveTill,
    );
    return token;
  }
}
