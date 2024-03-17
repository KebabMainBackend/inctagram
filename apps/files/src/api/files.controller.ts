import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FilesService } from '../files.service';
import { UploadAvatarDto } from './dto/upload-avatar.dto';
import { UploadPostImagesDto } from './dto/upload-post-images.dto';
import { MicroserviceMessagesEnum } from '../../../../types/messages';

@Controller()
export class FilesController {
  constructor(private fileService: FilesService) {}

  @MessagePattern({ cmd: MicroserviceMessagesEnum.UPLOAD_AVATAR })
  async upload(data: UploadAvatarDto) {
    return await this.fileService.uploadUserAvatar(data);
  }

  @MessagePattern({ cmd: MicroserviceMessagesEnum.DELETE_AVATAR })
  async deleteAvatars(data: { ownerId: number }) {
    return await this.fileService.deleteUserAvatars(data.ownerId);
  }

  @MessagePattern({ cmd: MicroserviceMessagesEnum.GET_AVATAR })
  async get(data: { ownerId: number }) {
    return await this.fileService.getAvatarImagesByOwnerId(data.ownerId);
  }

  @MessagePattern({ cmd: MicroserviceMessagesEnum.GET_POST_IMAGES })
  async getPostImages(data: { imagesIds: string[] }) {
    return await this.fileService.getImagesByIds(data.imagesIds);
  }

  @MessagePattern({ cmd: MicroserviceMessagesEnum.UPLOAD_POST_IMAGES })
  async uploadPostImages(data: UploadPostImagesDto) {
    return await this.fileService.uploadPostImages(data);
  }
  @MessagePattern({ cmd: MicroserviceMessagesEnum.DELETE_POST_IMAGE })
  async deletePostImage(data: { imageId: string; userId: number }) {
    return await this.fileService.deletePostImage(data.imageId, data.userId);
  }

  @MessagePattern({ cmd: MicroserviceMessagesEnum.GET_USER_THUMBNAIL_AVATAR })
  async getUserThumbnailAvatar(data: { imageId: string }) {
    return await this.fileService.getImageById(data.imageId);
  }

  @MessagePattern({ cmd: 'hello-world' })
  hello() {
    return 'hello world from files';
  }
}
