import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { GetOneChatResponse } from './get-one-chat.response.model';

export function SwaggerGetOneChatDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Connect to chat by id' }),
    ApiBody({
      description: 'ID чата для получения сообщений',
      schema: {
        example: {
          chatId: 117,
        },
      },
    }),
    ApiHeader({
      name: 'Authorization',
      description: 'accessToken',
      required: true,
    }),
    ApiResponse({
      status: 200,
      description:
        'Subscribe to event "get-one-chat-response-${chatId}" to see response',
      type: GetOneChatResponse,
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}
