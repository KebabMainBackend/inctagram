import { ApiProperty } from '@nestjs/swagger';
import { ChatMembersResponse } from './chatMembers.response.model';
import { ChatMessagesResponse } from './chatMessages.response.model';

export class GetOneChatResponse {
  @ApiProperty({
    nullable: false,
    type: Number,
    example: 2,
  })
  chatId: number;
  @ApiProperty({
    nullable: false,
    type: [ChatMembersResponse],
  })
  members: ChatMembersResponse[];
  @ApiProperty({
    nullable: false,
    type: [ChatMessagesResponse],
  })
  messages: ChatMessagesResponse[];
}
