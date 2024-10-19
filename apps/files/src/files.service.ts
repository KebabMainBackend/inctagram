import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UploadAvatarDto } from './api/dto/upload-avatar.dto';
import { Model, Types } from 'mongoose';
import { FileImageInterface } from './db/interfaces/file-image.interface';
import { CommandBus } from '@nestjs/cqrs';
import { FileCommandTypesEnum } from '../../../types/file-image-enum.types';
import { UploadPostImagesDto } from './api/dto/upload-post-images.dto';
import { FILE_IMAGE_SIZE } from './utils/constants';
import { DeleteFileCommand } from './application/use-cases/delete-file.command';
import { UploadFileCommand } from './application/use-cases/upload-file.command';
import { UploadVoiceDto } from './api/dto/upload-voice.dto';

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
        commandName: FileCommandTypesEnum.AVATAR_MEDIUM,
        fileSize: FILE_IMAGE_SIZE.mediumAvatar,
        fileExtension: null,
      }),
    );
    const thumbnailImage = await this.commandBus.execute(
      new UploadFileCommand({
        buffer,
        userId,
        commandName: FileCommandTypesEnum.AVATAR_THUMBNAIL,
        fileSize: FILE_IMAGE_SIZE.thumbnailAvatar,
        fileExtension: null,
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
          commandName: FileCommandTypesEnum.POST_IMAGE,
          fileSize: FILE_IMAGE_SIZE.postImage,
          fileExtension: null,
        }),
      );
      postImages.push(postImage);
    }
    return { postImages };
  }

  async uploadMessageImage({ userId, buffer }: UploadAvatarDto) {
    console.log(buffer);
    const messageImage = await this.commandBus.execute(
      new UploadFileCommand({
        buffer,
        userId,
        commandName: FileCommandTypesEnum.MESSENGER_IMAGE,
        fileSize: FILE_IMAGE_SIZE.mediumAvatar,
        fileExtension: null,
      }),
    );

    return messageImage;
  }
  async uploadMessageVoice({ userId, buffer, extension }: UploadVoiceDto) {
    console.log('uploadMessageVoice f service 2', buffer, extension);
    const messageVoice = await this.commandBus.execute(
      new UploadFileCommand({
        buffer,
        userId,
        commandName: FileCommandTypesEnum.MESSENGER_VOICE,
        fileSize: FILE_IMAGE_SIZE.mediumAvatar,
        fileExtension: extension,
      }),
    );

    return messageVoice;
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
    if (image) {
      if (image.ownerId !== userId) {
        return HttpStatus.FORBIDDEN;
      }
      await this.commandBus.execute(new DeleteFileCommand(image.url));
      return HttpStatus.NO_CONTENT;
    }
    return HttpStatus.NOT_FOUND;
  }
  async deleteUserPostImages(imageIds: string[]) {
    const images = await this.getImagesByIds(imageIds);
    if (images && images.length) {
      for (const image of images) {
        await this.commandBus.execute(new DeleteFileCommand(image.url));
      }
      return 'deleted';
    }
    return 'empty post';
  }
  async getAvatarImagesByOwnerId(ownerId: number) {
    return this.fileImageModel.find({
      ownerId,
      $nor: [
        {
          type: FileCommandTypesEnum.POST_IMAGE,
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
      type: FileCommandTypesEnum.POST_IMAGE,
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
  async getAllImagesOfUser(userId: number) {
    const images = await this.fileImageModel.find({
      ownerId: userId,
      type: 'post-image',
    });
    return images.map((i) => ({
      uploadId: i._id,
      url: 'https://storage.yandexcloud.net/kebab-inctagram/' + i.url,
      createdAt: i.createdAt,
      type: i.type,
    }));
  }
  async deleteAllImagesOfUser(userId: number) {
    await this.fileImageModel.deleteMany({
      ownerId: userId,
    });
  }
}
