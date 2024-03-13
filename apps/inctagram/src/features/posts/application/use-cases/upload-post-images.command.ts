import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { mapPostImages } from '../../db/view/mapPost';
import { MicroserviceMessagesEnum } from '../../../../../../../types/messages';

export class UploadPostImagesCommand {
  constructor(
    public buffers: Buffer[],
    public userId: number,
  ) {}
}

@CommandHandler(UploadPostImagesCommand)
export class UploadPostImagesHandler
  implements ICommandHandler<UploadPostImagesCommand>
{
  constructor(@Inject('FILES_SERVICE') private client: ClientProxy) {}

  async execute({ buffers, userId }: UploadPostImagesCommand) {
    const data = await firstValueFrom(
      await this.createFileImage(buffers, userId),
    );
    return { images: mapPostImages(data.postImages) };
  }
  async createFileImage(buffers: Buffer[], userId: number) {
    const pattern = { cmd: MicroserviceMessagesEnum.UPLOAD_POST_IMAGES };
    const payload = {
      userId,
      buffers,
    };
    return this.client.send(pattern, payload);
  }
}
