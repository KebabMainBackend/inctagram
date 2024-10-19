export class ChatMemberEntity {
  id: number;
  chatId: number;
  memberId: number;
  memberUsername: string;

  static create(memberId: number, memberUsername: string, chatId: number) {
    const chatMember = new ChatMemberEntity();

    chatMember.memberId = memberId;
    chatMember.memberUsername = memberUsername;
    chatMember.chatId = chatId;

    return chatMember;
  }
}
