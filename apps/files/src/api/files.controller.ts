import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FilesService } from '../files.service';
import { MicroserviceMessagesEnum } from '../messages';
import { UploadAvatarDto } from './dto/upload-avatar.dto';

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

  @MessagePattern({ cmd: 'hello-world' })
  hello() {
    return 'hello world from files';
  }
}
