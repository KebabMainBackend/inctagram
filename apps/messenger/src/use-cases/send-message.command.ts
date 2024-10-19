import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MessagesRepository } from '../db/messages.repository';
import { ChatsRepository } from '../db/chats.repository';
import { MessageEntity } from '../db/domain/message.entity';
import { UsersRepository } from '../../../inctagram/src/auth/db/users.repository';
import { BadRequestException } from '@nestjs/common';
import {
  allowedAudioExtensions,
  allowedImagesExtensions,
  MessengerAdapter,
} from '../adapters/messenger.adapter';
import { ConfigService } from '@nestjs/config';
import { WsException } from '@nestjs/websockets';
import { RpcException } from '@nestjs/microservices';
import { login } from '../../../inctagram/test/managers/login';

export class SendMessageCommand {
  constructor(
    public senderId: number,
    public recipientId: number,
    public message: string | null = null,
    public image: Buffer | null = null,
    public voice: Buffer | null = null,
  ) {}
}

@CommandHandler(SendMessageCommand)
export class SendMessageHandler implements ICommandHandler<SendMessageCommand> {
  constructor(
    private configService: ConfigService,
    private messagesRepository: MessagesRepository,
    private chatsRepository: ChatsRepository,
    private userRepository: UsersRepository,
    private messengerAdapter: MessengerAdapter,
  ) {}
  async execute(command: SendMessageCommand): Promise<any> {
    const { senderId, recipientId, message, image, voice } = command;
    const sender = await this.userRepository.getUserById(senderId);
    const recipient = await this.userRepository.getUserById(recipientId);

    if (!recipient) {
      // throw new RpcException({
      //   status: 400,
      //   field: 'userId',
      //   message: `Recipient with id ${recipientId} was not found`,
      // });
      throw new BadRequestException({
        field: 'recipientId',
        message: `Recipient with id ${recipientId} was not found`,
      });
    }
    console.log(1);
    let imageUrl: string | null | any = null;
    if (image) {
      const imageExt = this.messengerAdapter.getFileExtensionFromBuffer(image);

      if (!allowedImagesExtensions.includes(imageExt))
        throw new BadRequestException({
          field: 'image',
          message: `Allowed image file extensions is: ${allowedImagesExtensions}`,
        });

      const url = await this.messengerAdapter.sendFileToFileService(
        image,
        senderId,
        imageExt,
      );
      imageUrl = this.configService.get('FILES_STORAGE_URL') + url;
    }

    let voiceUrl: string | null = null;
    if (voice) {
      const voiceExt = this.messengerAdapter.getFileExtensionFromBuffer(voice);

      if (!allowedAudioExtensions.includes(voiceExt))
        throw new BadRequestException({
          field: 'voice',
          message: `Allowed audio file extensions is: ${allowedAudioExtensions}`,
        });

      const url = await this.messengerAdapter.sendFileToFileService(
        voice,
        senderId,
        voiceExt,
      );
      voiceUrl = this.configService.get('FILES_STORAGE_URL') + url;
    }

    let chat;
    chat = await this.chatsRepository.getOneByMembersIds(senderId, recipientId);

    if (!chat) {
      chat = await this.messengerAdapter.createChat(sender, recipient);
    }

    const newMessage = MessageEntity.create(message, imageUrl, voiceUrl);
    await this.messagesRepository.save(newMessage, sender.id, chat.id);
  }
}
