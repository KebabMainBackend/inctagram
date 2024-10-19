import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import sizeOf from 'image-size';
import { FileImageInterface } from '../../db/interfaces/file-image.interface';
import { S3StorageManager } from '../../adapters/s3-storage.adapter';
import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { FileCommandTypesEnum } from '../../../../../types/file-image-enum.types';
import * as sharp from 'sharp';

type UploadFileCommandTypes = {
  buffer: Buffer;
  userId: number;
  commandName: FileCommandTypesEnum;
  fileSize: number;
  fileExtension: string | null;
};

type UploadInDbAndCloudInputImageType = {
  buffer: Buffer;
  url: string;
  ownerId: number;
  fileSize: number;
  type: FileCommandTypesEnum;
};

export class UploadFileCommand {
  constructor(public data: UploadFileCommandTypes) {}
}

@CommandHandler(UploadFileCommand)
export class UploadFileHandler implements ICommandHandler<UploadFileCommand> {
  constructor(
    public s3Manager: S3StorageManager,
    @Inject('FILE_MODEL')
    private fileImageModel: Model<FileImageInterface>,
  ) {}
  execute(data: UploadFileCommand) {
    if (!data.data.fileExtension) {
      return this.uploadIFile(data);
    } else return this.uploadVFile(data);
  }
  async uploadIFile({ data }: UploadFileCommand) {
    const { buffer, userId: ownerId, commandName } = data;
    const url = this.createUrlForFile(ownerId, commandName, null);
    console.log(1);
    const fileBuffer = Buffer.from(buffer);
    console.log(2);
    const imageInfo = sizeOf(fileBuffer);
    console.log(3);
    const fileId = await this.uploadImageToCloud({
      buffer: fileBuffer,
      url,
      ownerId,
      type: commandName,
    });
    return {
      fileId: fileId,
      url,
      width: imageInfo.width,
      height: imageInfo.height,
      fileSize: fileBuffer.length,
      type: commandName,
    };
  }
  async uploadVFile({ data }: UploadFileCommand) {
    const { buffer, userId: ownerId, commandName, fileExtension } = data;

    const url = this.createUrlForFile(ownerId, commandName, fileExtension);
    const fileBuffer = Buffer.from(buffer);

    await this.s3Manager.saveFile(fileBuffer, url);

    return { url };
  }
  private async uploadImageToCloud({
    buffer,
    url,
    ownerId,
    type,
  }: Omit<UploadInDbAndCloudInputImageType, 'fileSize'>) {
    const fileSize = buffer.length;
    await this.s3Manager.saveFile(buffer, url);
    const currentImage = await this.createImageInDB({
      type,
      fileSize,
      ownerId,
      url,
      buffer,
    });
    return currentImage.id;
  }
  private async createImageInDB(data: UploadInDbAndCloudInputImageType) {
    const { buffer, url, ownerId, fileSize, type } = data;
    const { width, height } = sizeOf(buffer);
    const currentImage = new this.fileImageModel({
      url,
      width,
      height,
      ownerId,
      fileSize,
      type,
    });
    await currentImage.save();
    return currentImage;
  }

  private createUrlForFile(userId: number, type: FileCommandTypesEnum, ext) {
    if (type === FileCommandTypesEnum.MESSENGER_IMAGE)
      return `media/users/${userId}/chats-messages-images/${userId}-${Date.now()}.webp`;
    if (type === FileCommandTypesEnum.MESSENGER_VOICE)
      return `media/users/${userId}/chats-messages-voices/${userId}-${Date.now()}.${ext}`;
    return type === FileCommandTypesEnum.POST_IMAGE
      ? `media/users/${userId}/posts/${userId}-${Date.now()}.webp`
      : `media/users/${userId}/avatars/${userId}-${Date.now()}-${type}.webp`;
  }
}
