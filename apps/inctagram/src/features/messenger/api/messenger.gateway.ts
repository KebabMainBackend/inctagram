import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  BadRequestException,
  HttpStatus,
  Inject,
  NotFoundException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { SwaggerGetOneChatDecorator } from '../swagger/get-one-chat/get-one-chat.decorator';
import { UserTypes } from '../../../types';
import { User } from '../../../utils/decorators/user.decorator';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { MessagesMicroserviceMessagesEnum } from '../../../../../../types/messages';
import { WsBearerAuthGuard } from '../../../auth/guards/ws-bearer-auth.guard';
import { WsExceptionFilter } from '../../../modules/filters/ws-exception.filter';
@WebSocketGateway({})
export class MessengerGateway {
  constructor(@Inject('MESSENGER_SERVICE') private clientProxy: ClientProxy) {}
  @WebSocketServer() server: Server;
  @UseGuards(WsBearerAuthGuard)
  @SubscribeMessage('get-one-chat')
  @SwaggerGetOneChatDecorator()
  async getChatById(
    @MessageBody() payload: { chatId: number },
    @ConnectedSocket() client: Socket,
    @User() user: UserTypes,
  ) {
    try {
      const chatId = payload.chatId;
      const data = await firstValueFrom(
        this.clientProxy.send(
          { cmd: MessagesMicroserviceMessagesEnum.GET_CHAT },
          { chatId, userId: user.id },
        ),
      );
      if (data.errorCode === HttpStatus.NOT_FOUND) {
        throw new NotFoundException('Expired');
      }
      client.emit(`get-one-chat-response-${payload.chatId}`, { data });
    } catch (err) {
      client.emit(`get-one-chat-error-${payload.chatId}`, {
        message: 'Unauthorized',
      });
    }
  }
  @UseGuards(WsBearerAuthGuard)
  @SubscribeMessage('get-all-chats')
  @SwaggerGetOneChatDecorator()
  async getAllChats(
    @User() user: UserTypes,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const username = client.handshake.query.username ?? '';
      const data = await firstValueFrom(
        this.clientProxy.send(
          { cmd: MessagesMicroserviceMessagesEnum.GET_ALL_CHATS },
          { userId: user.id, username },
        ),
      );
      if (data.errorCode === HttpStatus.NOT_FOUND) {
        throw new NotFoundException('Expired');
      }
      client.emit('get-all-chats-response', data);
    } catch (error) {
      client.emit('get-all-chats-error', { message: 'Unauthorized' });
    }
  }
  @UseFilters(new WsExceptionFilter())
  @UseGuards(WsBearerAuthGuard)
  @SubscribeMessage('send-message')
  async sendMessage(
    @MessageBody()
    payload: {
      recipientId: number;
      message?: string;
    },
    @User() user: UserTypes,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const { recipientId, message } = payload;
      if (!message)
        throw new BadRequestException({
          field: 'message',
          message: 'Message is required',
        });

      const data = await firstValueFrom(
        this.clientProxy.send(
          { cmd: MessagesMicroserviceMessagesEnum.SEND_MESSAGE },
          {
            senderId: user.id,
            recipientId,
            message,
            image: null,
            voice: null,
          },
        ),
      );
      if (data.errorCode === HttpStatus.NOT_FOUND) {
        throw new NotFoundException('Expired');
      }
    } catch (err) {
      if (err.message === 'no elements in sequence') {
        return client.emit(`send-message-response-${user.id}`, {
          status: 204,
          message: 'No Content',
        });
      }
      client.emit(`send-message-error-${user.id}`, err);
    }
  }
}
