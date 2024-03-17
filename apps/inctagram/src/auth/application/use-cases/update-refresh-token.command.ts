import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { SecurityDevicesRepository } from '../../../features/security-devices/db/security-devices.repository';
import { SessionEntity } from '../../domain/entities/session.entity';
import { ConfigService } from '@nestjs/config';

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
    const newSession = SessionEntity.create(userId, session.deviceId);
    const newSessionId = await this.securityDevicesRepository.createSession(
      newSession,
    );
    await this.securityDevicesRepository.deleteSessionById(sessionId);
    return await this.jwtService.signAsync(
      {
        userId: oldRefresh.userId,
        sessionId: newSessionId,
      },
      {
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME'),
        secret: this.configService.get('JWT_REFRESH_KEY'),
      },
    );
  }
}
