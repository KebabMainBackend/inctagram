import { Inject, Injectable } from '@nestjs/common';
import { UploadAvatarDto } from './api/dto/upload-avatar.dto';
import { Model, Types } from 'mongoose';
import { FileImageInterface } from './db/interfaces/file-image.interface';
import { CommandBus } from '@nestjs/cqrs';
import { FileImageTypeEnum } from '../../../types/file-image-enum.types';
import { UploadPostImagesDto } from './api/dto/upload-post-images.dto';
import { FILE_IMAGE_SIZE } from './utils/constants';
import { DeleteFileCommand } from './application/use-cases/delete-file.command';
import { UploadFileCommand } from './application/use-cases/upload-file.command';

@Injectable()
export class FilesService {
  constructor(
    private commandBus: CommandBus,
    @Inject('FILE_MODEL')
    private fileImageModel: Model<FileImageInterface>,
  ) {}
  async uploadUserAvatar({ userId, buffer }: UploadAvatarDto) {
    const avatarImage = await this.commandBus.execute(
      new UploadFileCommand({
        buffer,
        userId,
        imageType: FileImageTypeEnum.AVATAR_MEDIUM,
        imageSize: FILE_IMAGE_SIZE.mediumAvatar,
      }),
    );
    const thumbnailImage = await this.commandBus.execute(
      new UploadFileCommand({
        buffer,
        userId,
        imageType: FileImageTypeEnum.AVATAR_THUMBNAIL,
        imageSize: FILE_IMAGE_SIZE.thumbnailAvatar,
      }),
    );
    return { avatars: [avatarImage, thumbnailImage] };
  }
  async uploadPostImages({ userId, buffers }: UploadPostImagesDto) {
    const postImages = [];
    for (const buffer of buffers) {
      const postImage = await this.commandBus.execute(
        new UploadFileCommand({
          buffer,
          userId,
          imageType: FileImageTypeEnum.POST_IMAGE,
          imageSize: FILE_IMAGE_SIZE.postImage,
        }),
      );
      postImages.push(postImage);
    }
    return { postImages };
  }
  async deleteUserAvatars(userId: number) {
    const images = await this.getAvatarImagesByOwnerId(userId);
    if (images && images.length) {
      for (const image of images) {
        await this.commandBus.execute(new DeleteFileCommand(image.url));
      }
    }
    return;
  }
  async deletePostImage(imageId: string, userId: number) {
    const image = await this.getImageById(imageId);
    if (image && image.ownerId === userId) {
      await this.commandBus.execute(new DeleteFileCommand(image.url));
      return true;
    }
    return false;
  }
  async getAvatarImagesByOwnerId(ownerId: number) {
    return this.fileImageModel.find({
      ownerId,
      $nor: [
        {
          type: FileImageTypeEnum.POST_IMAGE,
        },
      ],
    });
  }
  async getImageById(imageId: string) {
    return this.fileImageModel.findById(imageId);
  }

  async getImagesByIds(imageIds: string[]) {
    const images = await this.fileImageModel.find({
      _id: {
        $in: imageIds.map((i) => new Types.ObjectId(i)),
      },
      type: FileImageTypeEnum.POST_IMAGE,
    });
    return images.map((image) => ({
      fileId: image._id,
      url: image.url,
      width: image.width,
      height: image.height,
      fileSize: image.fileSize,
      type: image.type,
    }));
  }
}
