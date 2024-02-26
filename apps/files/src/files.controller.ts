import { Controller } from '@nestjs/common';
import {
  // Ctx,
  MessagePattern,
  // Payload,
  // RmqContext,
} from '@nestjs/microservices';

@Controller()
export class FilesController {
  constructor() {}

  @MessagePattern({ cmd: 'upload-avatar' })
  sum(data: any) {
    console.log(data);
    // console.log(`Pattern: ${context.getPattern()}`);
    // console.log(context.getMessage());
    return { content: 'what' };
  }
}
