import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChatsRepository } from '../db/chats.repository';
import { BadRequestException, HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export interface GetChatRequestDto {
  chatId: number;
  userId: number;
}
export class GetChatCommand {
  constructor(public payload: GetChatRequestDto) {}
}

@CommandHandler(GetChatCommand)
export class GetChatHandler implements ICommandHandler<GetChatCommand> {
  constructor(private chatsRepository: ChatsRepository) {}
  async execute(command: GetChatCommand): Promise<any> {
    const { chatId, userId } = command.payload;

    const chat = await this.chatsRepository.getOneByChatId(chatId);
    if (!chat)
      throw new BadRequestException({
        field: 'chatId',
        message: `Chat with id ${chatId} was not found`,
      });

    const isThatUserMemberOfChat = chat.chatMember.find(
      (member) => member.memberId === userId,
    );
    if (!isThatUserMemberOfChat) throw new HttpException('Forbidden', 403);

    return {
      chatId: chat.id,
      members: chat.chatMember.map((member) => {
        return {
          userId: member.memberId,
          username: member.memberUsername,
        };
      }),
      messages: chat.messages.map((message) => {
        delete message.chatId;
        return message;
      }),
    };
  }
}
