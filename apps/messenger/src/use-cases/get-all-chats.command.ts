import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChatsRepository } from '../db/chats.repository';

export interface GetAllChatsRequestDto {
  username: string;
  userId: number;
}
export class GetAllChatsCommand {
  constructor(public payload: GetAllChatsRequestDto) {}
}

@CommandHandler(GetAllChatsCommand)
export class GetAllChatsHandler implements ICommandHandler<GetAllChatsCommand> {
  constructor(private chatsRepository: ChatsRepository) {}
  async execute(command: GetAllChatsCommand): Promise<any> {
    const { username, userId } = command.payload;
    const chats = await this.chatsRepository.getAllChatsByUserIdAndUsername(
      userId,
      username ?? '',
    );

    return chats.map((chat) => {
      const messageInfo = chat.messages[0];
      return {
        chatId: chat.id,
        companion: {
          id: chat.chatMember[0].memberId,
          username: chat.chatMember[0].memberUsername,
        },
        message: {
          createdAt: chat.messages[0].createdAt,
          textMessage: messageInfo.message,
          voiceUrl: messageInfo.voiceUrl,
          imgUrl: messageInfo.imgUrl,
          username: chat.messages[0].user.username,
        },
      };
    });
  }
}
