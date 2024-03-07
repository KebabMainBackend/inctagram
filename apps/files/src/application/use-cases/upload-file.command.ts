import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import sizeOf from 'image-size';
import { FileImageInterface } from '../../db/interfaces/file-image.interface';
import { S3StorageManager } from '../../adapters/s3-storage.adapter';
import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import * as sharp from 'sharp';
import {
  FileImageAvatarTypeEnum,
  FileImageTypeEnum,
} from '../../../../../types/file-image-enum.types';

type UploadFileCommandTypes = {
  buffer: Buffer;
  userId: number;
  imageType: FileImageTypeEnum;
  suffix: FileImageAvatarTypeEnum;
  imageSize: number;
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
    return this.uploadIFile(data);
  }
  async uploadIFile({ data }: UploadFileCommand) {
    const { buffer, userId: ownerId, imageSize, suffix, imageType } = data;
    const url = this.createUrlForImage(ownerId, imageType, suffix);
    const fileBuffer = Buffer.from(buffer);
    const compressedBuffer = await this.compressImage(fileBuffer, imageSize);
    const fileId = await this.uploadImageToCloud(
      compressedBuffer,
      url,
      ownerId,
      suffix,
    );
    return {
      fileId: fileId,
      url,
      width: imageSize,
      height: imageSize,
      fileSize: compressedBuffer.length,
      type: suffix,
    };
  }
  async compressImage(imageBuffer: Buffer, size: number) {
    return await sharp(imageBuffer).resize(size, size).webp().toBuffer();
  }
  async uploadImageToCloud(
    buffer: Buffer,
    url: string,
    ownerId: number,
    type: FileImageAvatarTypeEnum,
  ) {
    const { width, height } = sizeOf(buffer);
    const fileSize = buffer.length;
    let currentImage = await this.fileImageModel.findOne({
      ownerId,
      type,
    });
    await this.s3Manager.saveImage(buffer, url);
    if (currentImage) {
      await this.fileImageModel.updateOne(
        {
          ownerId,
          type,
        },
        {
          fileSize,
        },
      );
    } else {
      currentImage = new this.fileImageModel({
        url,
        width,
        height,
        ownerId,
        fileSize,
        type: type,
      });
      await currentImage.save();
    }
    return currentImage.id;
  }
  createUrlForImage(
    userId: number,
    type: FileImageTypeEnum,
    suffix: FileImageAvatarTypeEnum,
  ) {
    return `media/users/${userId}/${type}/${userId}-${suffix}.webp`;
  }
}
