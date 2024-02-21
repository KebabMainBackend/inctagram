import { Controller, Get } from '@nestjs/common';
import { FilesService } from './files.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @MessagePattern({ cmd: 'upload-avatar' })
  sum(data: any) {
    console.log('dede');
    // console.log(`Pattern: ${context.getPattern()}`);
    // console.log(context.getMessage());
    return { content: 'what' };
  }
}
