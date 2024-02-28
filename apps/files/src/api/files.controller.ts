import { Controller, Get } from '@nestjs/common';
import {
  // Ctx,
  MessagePattern,
  // Payload,
  // RmqContext,
} from '@nestjs/microservices';
import { FilesService } from '../files.service';
import { MicroserviceMessagesEnum } from '../messages';
import { UploadAvatarDto } from './dto/upload-avatar.dto';

@Controller()
export class FilesController {
  constructor(private fileService: FilesService) {}

  @Get('/hello')
  hello() {
    return 'hello';
  }

  @MessagePattern({ cmd: MicroserviceMessagesEnum.UPLOAD_AVATAR })
  async upload(data: UploadAvatarDto) {
    return await this.fileService.uploadIFile(data);
  }

  @MessagePattern({ cmd: MicroserviceMessagesEnum.DELETE_AVATAR })
  async delete(data: { fileId: string }) {
    return await this.fileService.deleteFile(data.fileId);
  }

  @MessagePattern({ cmd: MicroserviceMessagesEnum.GET_AVATAR })
  async get(data: { fileId: string }) {
    return await this.fileService.getImage(data.fileId);
  }
}
