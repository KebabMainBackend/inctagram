import { Inject, Injectable } from '@nestjs/common';
import { S3StorageManager } from './adapters/s3-storage.adapter';
import { UploadAvatarDto } from './api/dto/upload-avatar.dto';
import { Model } from 'mongoose';
import { FileImageInterface } from './db/interfaces/file-image.interface';
import { UploadFileCommand } from './application/use-cases/upload-file.command';
import { CommandBus } from '@nestjs/cqrs';
import { FileImageTypeEnum } from '../../../types/file-image-enum.types';

@Injectable()
export class FilesService {
  constructor(
    public s3Manager: S3StorageManager,
    @Inject('FILE_MODEL')
    private fileImageModel: Model<FileImageInterface>,
    private readonly commandBus: CommandBus,
  ) {}
  async uploadUserAvatar({ userId, buffer }: UploadAvatarDto) {
    const avatarImage = await this.commandBus.execute(
      new UploadFileCommand(
        buffer,
        userId,
        FileImageTypeEnum.AVATAR_MEDIUM,
        192,
      ),
    );
    const thumbnailImage = await this.commandBus.execute(
      new UploadFileCommand(
        buffer,
        userId,
        FileImageTypeEnum.AVATAR_THUMBNAIL,
        45,
      ),
    );
    return { avatars: [avatarImage, thumbnailImage] };
  }
  async deleteFile(userId: number) {
    const images = await this.getImage(userId);
    if (images && images.length) {
      for (const image of images) {
        await this.s3Manager.deleteImage(image.url);
      }
      return this.fileImageModel.deleteMany({
        ownerId: userId,
      });
    }
  }
  async getImage(ownerId: number) {
    return this.fileImageModel.find({
      ownerId,
    });
  }
}
