import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function SwaggerSendMessageDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Send message to user' }),
    ApiHeader({
      name: 'Authorization',
      description: 'accessToken',
      required: true,
    }),
    ApiResponse({ status: 201, description: 'Created' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}
