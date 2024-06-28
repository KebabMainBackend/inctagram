import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const WsUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToWs().getClient();
    if (request.owner) {
      return request.owner;
    }
    throw new UnauthorizedException();
  },
);
