import { Inject, Injectable } from '@nestjs/common';
import { S3StorageManager } from './adapters/s3-storage.adapter';
import sizeOf from 'image-size';
import { UploadAvatarDto } from './api/dto/upload-avatar.dto';
import { Model } from 'mongoose';
import {
  FileImageInterface,
  FileImageTypeEnum,
} from './db/interfaces/file-image.interface';

@Injectable()
export class FilesService {
  constructor(
    public s3Manager: S3StorageManager,
    @Inject('FILE_MODEL')
    private fileImageModel: Model<FileImageInterface>,
  ) {}

  async uploadIFile(data: UploadAvatarDto) {
    const { buffer, userId: ownerId, fileSize, url } = data;
    const fileBuffer = Buffer.from(buffer);
    const { width, height } = sizeOf(fileBuffer);
    const fileImage = new this.fileImageModel({
      url,
      width,
      height,
      ownerId,
      fileSize,
      type: FileImageTypeEnum.AVATAR,
    });
    await fileImage.save();
    await this.s3Manager.saveImage(buffer, url);
    return {
      avatarId: fileImage.id,
      url: 'https://storage.yandexcloud.net/kebab-inctagram/' + fileImage.url,
      width,
      height,
    };
  }
  async deleteFile(fileImageId: string) {
    const image = await this.getImage(fileImageId);
    if (image) {
      await this.s3Manager.deleteImage(image.url);
      return this.fileImageModel.deleteOne({
        _id: fileImageId,
      });
    }
  }
  async getImage(fileImageId: string) {
    return this.fileImageModel.findById(fileImageId);
  }
}
