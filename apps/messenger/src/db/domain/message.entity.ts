export class MessageEntity {
  message: string | null;
  imgUrl: string | null;
  voiceUrl: string | null;

  static create(message = null, imgUrl = null, voiceUrl = null) {
    const newMessage = new MessageEntity();

    newMessage.message = message;
    newMessage.imgUrl = imgUrl;
    newMessage.voiceUrl = voiceUrl;

    return newMessage;
  }
}
