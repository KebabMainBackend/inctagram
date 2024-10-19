import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { SendMessageCommand } from '../use-cases/send-message.command';
import {
  GetChatCommand,
  GetChatRequestDto,
} from '../use-cases/get-chat.command';
import {
  GetAllChatsCommand,
  GetAllChatsRequestDto,
} from '../use-cases/get-all-chats.command';

@Controller()
export class MessengerController {
  constructor(private commandBus: CommandBus) {}

  @MessagePattern({
    cmd: 'get-chat',
  })
  async findChatById(payload: GetChatRequestDto) {
    return await this.commandBus.execute(
      new GetChatCommand({ chatId: +payload.chatId, userId: payload.userId }),
    );
  }

  @MessagePattern({
    cmd: 'get-all-chats',
  })
  async findAllChats(payload: GetAllChatsRequestDto) {
    return await this.commandBus.execute(new GetAllChatsCommand(payload));
  }

  @MessagePattern({
    cmd: 'send-message',
  })
  async sendMessage(payload: SendMessageCommand) {
    const { senderId, recipientId, message, image, voice } = payload;
    await this.commandBus.execute(
      new SendMessageCommand(senderId, +recipientId, message, image, voice),
    );
  }
}
