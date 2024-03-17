import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import sizeOf from 'image-size';
import { FileImageInterface } from '../../db/interfaces/file-image.interface';
import { S3StorageManager } from '../../adapters/s3-storage.adapter';
import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import * as sharp from 'sharp';
import { FileImageTypeEnum } from '../../../../../types/file-image-enum.types';

type UploadFileCommandTypes = {
  buffer: Buffer;
  userId: number;
  imageType: FileImageTypeEnum;
  imageSize: number;
};

type UploadInDbAndCloudInputImageType = {
  buffer: Buffer;
  url: string;
  ownerId: number;
  fileSize: number;
  type: FileImageTypeEnum;
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
  async execute(data: UploadFileCommand) {
    console.log('dwdwdw');
    return await this.uploadIFile(data);
  }
  async uploadIFile({ data }: UploadFileCommand) {
    const { buffer, userId: ownerId, imageSize, imageType } = data;
    const url = this.createUrlForFileImage(ownerId, imageType);
    const fileBuffer = Buffer.from(buffer);
    const compressedBuffer = await this.compressImage(fileBuffer, imageSize);
    const fileId = await this.uploadImageToCloud({
      buffer: compressedBuffer,
      url,
      ownerId,
      type: imageType,
    });
    return {
      fileId: fileId,
      url,
      width: imageSize,
      height: imageSize,
      fileSize: compressedBuffer.length,
      type: imageType,
    };
  }
  private async compressImage(imageBuffer: Buffer, size: number) {
    return await sharp(imageBuffer).resize(size, size).webp().toBuffer();
  }
  private async uploadImageToCloud({
    buffer,
    url,
    ownerId,
    type,
  }: Omit<UploadInDbAndCloudInputImageType, 'fileSize'>) {
    const fileSize = buffer.length;
    // let currentImage = await this.fileImageModel.findOne({
    //   ownerId,
    //   type: type,
    // });
    // console.log(currentImage, 'ccce');
    await this.s3Manager.saveImage(buffer, url);
    // if (currentImage && currentImage.type !== FileImageTypeEnum.POST_IMAGE) {
    //   await this.fileImageModel.updateOne(
    //     {
    //       ownerId,
    //       type,
    //     },
    //     {
    //       fileSize,
    //     },
    //   );
    // } else {
    const currentImage = await this.createImageInDB({
      type,
      fileSize,
      ownerId,
      url,
      buffer,
    });
    return currentImage.id;
  }
  private createUrlForFileImage(userId: number, type: FileImageTypeEnum) {
    return type === FileImageTypeEnum.POST_IMAGE
      ? `media/users/${userId}/posts/${userId}-${Date.now()}.webp`
      : `media/users/${userId}/avatars/${userId}-${Date.now()}-${type}.webp`;
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
}
