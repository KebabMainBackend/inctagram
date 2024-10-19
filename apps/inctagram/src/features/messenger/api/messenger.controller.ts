import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserTypes } from '../../../types';
import { User } from '../../../utils/decorators/user.decorator';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { MessagesMicroserviceMessagesEnum } from '../../../../../../types/messages';
import { FileSizeValidation } from './interceptors/fileSize.interceptor';
import { SwaggerSendMessageDecorator } from '../swagger/send-message/send-message.decorator';
import { BearerAuthGuard } from '../../../auth/guards/bearer-auth.guard';
import { SendMessageRequest } from '../swagger/send-message/send-message.request.model';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import {
  allowedAudioExtensions,
  allowedImagesExtensions,
} from '../../../../../messenger/src/adapters/messenger.adapter';
@Controller('messenger')
export class MessengerController {
  constructor(@Inject('MESSENGER_SERVICE') private clientProxy: ClientProxy) {}
  @UseGuards(BearerAuthGuard)
  @Post('send-file/:recipientId')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        callback(null, true); // Убираем проверку на отсутствие файла
      },
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  @SwaggerSendMessageDecorator()
  async sendMessage(
    @Param('recipientId') recipientId: string,
    @Body() payload: SendMessageRequest,
    @UploadedFile() file: Express.Multer.File,
    @User() user: UserTypes,
  ) {
    const fileExt = file ? file.mimetype.split('/')[1] : null;
    let fileType = null;
    if (allowedAudioExtensions.includes(fileExt)) {
      fileType = 'audio';
    } else if (allowedImagesExtensions.includes(fileExt)) fileType = 'image';

    const { message } = payload;
    if (!message && !file) {
      throw new BadRequestException({
        field: 'message',
        message: 'Either message, image, or voice must be provided.',
      });
    }
    if (message && allowedAudioExtensions.includes(fileExt))
      throw new BadRequestException({
        field: 'message',
        message: 'Voice can not be sent together with message or image',
      });
    if (fileType === 'image')
      FileSizeValidation.validateFileSize(1 * 1024 * 1024, file.buffer);

    if (fileType === 'audio')
      FileSizeValidation.validateFileSize(3 * 1024 * 1024, file.buffer);

    const uploadImageDto = plainToInstance(SendMessageRequest, { file });
    const errors = await validate(uploadImageDto);
    if (errors.length > 0) {
      throw new BadRequestException({
        field: 'file',
        message: errors[0].constraints.IsFileConstraint,
      });
    }

    const data = await firstValueFrom(
      this.clientProxy.send(
        { cmd: MessagesMicroserviceMessagesEnum.SEND_MESSAGE },
        {
          senderId: user.id,
          recipientId: +recipientId,
          message: message ?? null,
          image: fileType === 'image' ? file.buffer : null,
          voice: fileType === 'audio' ? file.buffer : null,
        },
      ),
    );

    if (data.errorCode === HttpStatus.NOT_FOUND) {
      throw new NotFoundException('Expired');
    }
  }
}
