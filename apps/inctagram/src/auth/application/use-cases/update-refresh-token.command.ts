import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { SecurityDevicesRepository } from '../../../features/security-devices/db/security-devices.repository';
import { ConfigService } from '@nestjs/config';
import { add } from 'date-fns';

export class UpdateRefreshTokenCommand {
  constructor(
    public oldRefresh: {
      userId: number;
      sessionId: string;
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
    private configService: ConfigService,
  ) {}
  async execute({ oldRefresh }: UpdateRefreshTokenCommand) {
    const { userId, sessionId } = oldRefresh;
    const session = await this.securityDevicesRepository.getSession(sessionId);
    const currentTime = new Date();
    const lastActiveDate = currentTime.toISOString();
    const aliveTill = add(currentTime, { minutes: 15 });
    await this.securityDevicesRepository.updateLastActiveDateOfSession(
      sessionId,
      lastActiveDate,
      aliveTill,
    );

    return await this.jwtService.signAsync(
      {
        userId: oldRefresh.userId,
        sessionId,
      },
      {
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME'),
        secret: this.configService.get('JWT_REFRESH_KEY'),
      },
    );
  }
}
