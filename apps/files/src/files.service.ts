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
    console.log(buffer);
    const { width, height } = sizeOf(buffer);
    const fileImage = new this.fileImageModel({
      url,
      width,
      height,
      ownerId,
      fileSize,
      type: FileImageTypeEnum.AVATAR,
    });
    await fileImage.save();
    console.log(fileImage.id);
    // await this.s3Manager.saveImage(buffer, url);
    return fileImage.id;
  }
}
