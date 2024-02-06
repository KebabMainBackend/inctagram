import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { SecurityDevicesQueryRepository } from '../../features/security-devices/db/security-devices.query-repository';

export class DecodeRefreshTokenCommand {
  constructor(public refresh: string) {}
}

@CommandHandler(DecodeRefreshTokenCommand)
export class DecodeRefreshTokenHandler
  implements ICommandHandler<DecodeRefreshTokenCommand>
{
  constructor(
    private readonly securityDevicesQueryRepository: SecurityDevicesQueryRepository,
    private readonly jwtService: JwtService,
  ) {}
  async execute({ refresh }: DecodeRefreshTokenCommand) {
    try {
      const result: any = await this.jwtService.verifyAsync(refresh, {
        secret: process.env.JWT_REFRESH_KEY,
      });
      const isInBlackList =
        await this.securityDevicesQueryRepository.getBlackList(refresh);
      const device =
        await this.securityDevicesQueryRepository.getDeviceByUserIdAndDeviceId(
          result.deviceId,
          result.userId,
        );
      if (isInBlackList) {
        return null;
      }
      if (!device) {
        return null;
      }
      if (result.exp * 1000 < Date.now()) {
        return null;
      }
      return {
        userId: result.userId,
        deviceId: result.deviceId,
      };
    } catch (e) {
      return null;
    }
  }
}
