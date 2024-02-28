import { Controller } from '@nestjs/common';
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

  @MessagePattern({ cmd: MicroserviceMessagesEnum.UPLOAD_AVATAR })
  async sum(data: UploadAvatarDto) {
    const url = await this.fileService.uploadIFile(data);
    return { avatarUrl: url };
  }
}
