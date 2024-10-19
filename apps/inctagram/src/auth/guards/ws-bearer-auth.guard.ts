import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../db/users.repository';
import { ConfigService } from '@nestjs/config';
import { WsException } from '@nestjs/websockets';
import { getCookieValue } from '../../utils/helpers/get-cookie-from-string';

@Injectable()
export class WsBearerAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersRepo: UsersRepository,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const cookies = client.handshake.headers.cookie;
    const token = getCookieValue(cookies, 'refreshToken');
    if (!token) {
      throw new WsException('Unauthorized');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      });
      if (payload.userId) {
        const user = await this.usersRepo.getUserById(payload.userId);
        if (user) {
          const request = context.switchToHttp().getRequest();
          request['owner'] = {
            id: user.id,
            email: user.email,
          };
          return true;
        }
      }
    } catch (err) {
      console.error('Error in JWT verification:', err); // Логируем ошибку
      throw new WsException('Unauthorized');
    }
  }
}
