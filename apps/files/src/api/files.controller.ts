import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FilesService } from '../files.service';
import { UploadAvatarDto } from './dto/upload-avatar.dto';
import { UploadPostImagesDto } from './dto/upload-post-images.dto';
import { FilesMicroserviceMessagesEnum } from '../../../../types/messages';
import { UploadVoiceDto } from './dto/upload-voice.dto';

@Controller()
export class FilesController {
  constructor(private fileService: FilesService) {}

  @MessagePattern({ cmd: FilesMicroserviceMessagesEnum.UPLOAD_AVATAR })
  async upload(data: UploadAvatarDto) {
    return await this.fileService.uploadUserAvatar(data);
  }

  @MessagePattern({ cmd: FilesMicroserviceMessagesEnum.DELETE_AVATAR })
  async deleteAvatars(data: { ownerId: number }) {
    return await this.fileService.deleteUserAvatars(data.ownerId);
  }

  @MessagePattern({ cmd: FilesMicroserviceMessagesEnum.GET_AVATAR })
  async get(data: { ownerId: number }) {
    return await this.fileService.getAvatarImagesByOwnerId(data.ownerId);
  }

  @MessagePattern({ cmd: FilesMicroserviceMessagesEnum.GET_POST_IMAGES })
  async getPostImages(data: { imagesIds: string[] }) {
    return await this.fileService.getImagesByIds(data.imagesIds);
  }

  @MessagePattern({ cmd: FilesMicroserviceMessagesEnum.DELETE_POST_IMAGES })
  async deletePostImages(data: { imagesIds: string[] }) {
    return await this.fileService.deleteUserPostImages(data.imagesIds);
  }

  @MessagePattern({ cmd: FilesMicroserviceMessagesEnum.UPLOAD_POST_IMAGES })
  async uploadPostImages(data: UploadPostImagesDto) {
    return await this.fileService.uploadPostImages(data);
  }
  @MessagePattern({ cmd: FilesMicroserviceMessagesEnum.DELETE_POST_IMAGE })
  async deletePostImage(data: { imageId: string; userId: number }) {
    return await this.fileService.deletePostImage(data.imageId, data.userId);
  }

  @MessagePattern({ cmd: FilesMicroserviceMessagesEnum.UPLOAD_MESSENGER_IMAGE })
  async uploadMessageImage(data: UploadAvatarDto) {
    console.log('data.buffer' + data.buffer);
    return await this.fileService.uploadMessageImage(data);
  }

  @MessagePattern({ cmd: FilesMicroserviceMessagesEnum.UPLOAD_MESSENGER_VOICE })
  async uploadMessageVoice(data: UploadVoiceDto) {
    console.log('uploadMessageVoice f con 1');
    return await this.fileService.uploadMessageVoice(data);
  }

  @MessagePattern({
    cmd: FilesMicroserviceMessagesEnum.GET_USER_THUMBNAIL_AVATAR,
  })
  async getUserThumbnailAvatar(data: { imageId: string }) {
    return await this.fileService.getImageById(data.imageId);
  }

  @MessagePattern({
    cmd: FilesMicroserviceMessagesEnum.GET_USER_ALL_PHOTOS,
  })
  async getUserAllPhotos(data: { ownerId: number }) {
    return await this.fileService.getAllImagesOfUser(data.ownerId);
  }

  @MessagePattern({
    cmd: FilesMicroserviceMessagesEnum.DELETE_USER_ALL_PHOTOS,
  })
  async deleteUserAllPhotos(data: { ownerId: number }) {
    return await this.fileService.deleteAllImagesOfUser(data.ownerId);
  }

  @MessagePattern({ cmd: 'hello-world' })
  hello() {
    return 'hello world from files';
  }
}
