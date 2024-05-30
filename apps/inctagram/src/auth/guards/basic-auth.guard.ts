import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { AuthenticationError } from '@nestjs/apollo';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const base64 = this.extractTokenFromHeader(req);
    if (!base64) {
      throw new AuthenticationError('no header');
    }
    const [login, password] = Buffer.from(base64, 'base64')
      .toString()
      .split(':');
    if (
      login &&
      password &&
      login === this.configService.get('ADMIN_LOGIN') &&
      password === this.configService.get('ADMIN_PASSWORD')
    ) {
      return true;
    }
    throw new AuthenticationError('Invalid credentials');
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, base64] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Basic' ? base64 : null;
  }
}
