import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { SecurityDevicesQueryRepository } from '../../../features/security-devices/db/security-devices.query-repository';
import { ConfigService } from '@nestjs/config';

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
    private configService: ConfigService,
  ) {}
  async execute({ refresh }: DecodeRefreshTokenCommand) {
    try {
      const result: any = await this.jwtService.verifyAsync(refresh, {
        secret: this.configService.get('JWT_REFRESH_KEY'),
      });
      const isInBlackList =
        await this.securityDevicesQueryRepository.getBlackList(refresh);
      const session =
        await this.securityDevicesQueryRepository.getSessionByUserIdAndSessionId(
          result.sessionId,
          result.userId,
        );
      if (isInBlackList) {
        return null;
      }
      if (!session) {
        return null;
      }
      if (result.exp * 1000 < Date.now()) {
        return null;
      }
      return {
        userId: result.userId,
        sessionId: result.sessionId,
      };
    } catch (e) {
      return null;
    }
  }
}
