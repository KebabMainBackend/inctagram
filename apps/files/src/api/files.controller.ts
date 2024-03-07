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
  async delete(data: { ownerId: number }) {
    return await this.fileService.deleteFile(data.ownerId);
  }

  @MessagePattern({ cmd: MicroserviceMessagesEnum.GET_AVATAR })
  async get(data: { ownerId: number }) {
    return await this.fileService.getImage(data.ownerId);
  }

  @MessagePattern({ cmd: MicroserviceMessagesEnum.UPLOAD_POST_IMAGES })
  async uploadPostImages(data: UploadPostImagesDto) {
    console.log('daat');
    console.log(data);
    return 'darta';
    // return await this.fileService.uploadUserAvatar(data);
  }

  @MessagePattern({ cmd: 'hello-world' })
  hello() {
    return 'hello world from files';
  }
}
