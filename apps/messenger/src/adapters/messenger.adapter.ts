import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { FilesMicroserviceMessagesEnum } from '../../../../types/messages';
import { ChatMemberEntity } from '../db/domain/chatMember.entity';
import { ChatsRepository } from '../db/chats.repository';
import { ChatMembersRepository } from '../db/chatMembers.repository';

export const allowedAudioExtensions = ['ogg', 'mp3', 'aac', 'wav', 'mp4'];
export const allowedImagesExtensions = ['jpeg', 'jpg', 'png'];
export class MessengerAdapter {
  constructor(
    @Inject('FILES_SERVICE') private client: ClientProxy,
    private chatsRepository: ChatsRepository,
    private chatMembersRepository: ChatMembersRepository,
  ) {}

  async sendFileToFileService(file: Buffer, userId, extension: string) {
    const data = await firstValueFrom(
      await this.createFile(file, userId, extension),
    );
    return data.url;
  }

  async createFile(buffer: Buffer, userId: number, extension: string) {
    let pattern;
    let payload;
    if (allowedImagesExtensions.includes(extension)) {
      pattern = {
        cmd: FilesMicroserviceMessagesEnum.UPLOAD_MESSENGER_IMAGE,
      };
      payload = {
        userId,
        buffer,
      };
    } else if (allowedAudioExtensions.includes(extension)) {
      pattern = {
        cmd: FilesMicroserviceMessagesEnum.UPLOAD_MESSENGER_VOICE,
      };
      payload = {
        userId,
        buffer,
        extension,
      };
    }

    return this.client.send(pattern, payload);
  }

  async createChat(sender, recipient) {
    const chat = await this.chatsRepository.save();
    const Sender = ChatMemberEntity.create(sender.id, sender.username, chat.id);
    const Recipient = ChatMemberEntity.create(
      recipient.id,
      recipient.username,
      chat.id,
    );
    const firstMember = await this.chatMembersRepository.save(Sender);
    const secondMember = await this.chatMembersRepository.save(Recipient);

    await this.chatsRepository.relateChatMembersToChat(
      chat.id,
      firstMember,
      secondMember,
    );

    return chat;
  }

  getFileExtensionFromBuffer(buffer) {
    const header = buffer.data.slice(0, 4); // Получаем первые 4 байта
    const headerHex = header
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join(''); // Преобразуем в шестнадцатеричный формат

    // Проверка на различные типы файлов
    if (headerHex.startsWith('ffd8')) {
      return 'jpg'; // JPEG
    } else if (headerHex.startsWith('8950')) {
      return 'png'; // PNG
    } else if (headerHex.startsWith('494433')) {
      return 'mp3'; // MP3
    } else if (headerHex.startsWith('52494646')) {
      return 'wav'; // WAV
    } else if (headerHex.startsWith('4f676753')) {
      return 'ogg'; // OGG
    } else if (
      headerHex.startsWith('00000018') ||
      headerHex.startsWith('0000001c') ||
      headerHex.includes('66747970')
    ) {
      // Проверка на M4A или MP4
      if (
        headerHex.includes('69736f6d') ||
        headerHex.includes('6d703432') ||
        headerHex.includes('6d703431')
      ) {
        return 'm4a'; // M4A
      }
      return 'mp4'; // MP4
    } else if (headerHex.startsWith('fff1') || headerHex.startsWith('fff9')) {
      return 'aac'; // AAC
    }
    // Добавьте другие проверки по необходимости

    return ''; // Неизвестный тип файла
  }
}
