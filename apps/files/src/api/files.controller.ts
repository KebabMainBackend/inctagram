import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FilesService } from '../files.service';
import { UploadAvatarDto } from './dto/upload-avatar.dto';
import { UploadPostImagesDto } from './dto/upload-post-images.dto';
import { FilesMicroserviceMessagesEnum } from '../../../../types/messages';

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

  @MessagePattern({ cmd: FilesMicroserviceMessagesEnum.UPLOAD_POST_IMAGES })
  async uploadPostImages(data: UploadPostImagesDto) {
    return await this.fileService.uploadPostImages(data);
  }
  @MessagePattern({ cmd: FilesMicroserviceMessagesEnum.DELETE_POST_IMAGE })
  async deletePostImage(data: { imageId: string; userId: number }) {
    return await this.fileService.deletePostImage(data.imageId, data.userId);
  }

  @MessagePattern({
    cmd: FilesMicroserviceMessagesEnum.GET_USER_THUMBNAIL_AVATAR,
  })
  async getUserThumbnailAvatar(data: { imageId: string }) {
    return await this.fileService.getImageById(data.imageId);
  }

  @MessagePattern({ cmd: 'hello-world' })
  hello() {
    return 'hello world from files';
  }
}
