import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DeviceSessionGuard = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.deviceSession) throw new Error('JWT guard must be used');
    return request.deviceSession;
  },
);
