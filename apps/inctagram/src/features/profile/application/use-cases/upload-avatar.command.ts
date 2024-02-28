import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../../prisma.service';
import { S3StorageManager } from '../../managers/s3-storage.manager';
import { ProfileRepository } from '../../db/profile.repository';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceMessagesEnum } from '../messages';

export class UploadAvatarCommand {
  constructor(
    public buffer: Buffer,
    public extension: string,
    public userId: number,
    public fileSize: number,
  ) {}
}

@CommandHandler(UploadAvatarCommand)
export class UploadAvatarHandler
  implements ICommandHandler<UploadAvatarCommand>
{
  constructor(
    private prisma: PrismaService,
    private s3Manager: S3StorageManager,
    private profileRepo: ProfileRepository,
    @Inject('FILES_SERVICE') private client: ClientProxy,
  ) {}

  async execute({ buffer, userId, extension, fileSize }: UploadAvatarCommand) {
    const userAvatar = await this.profileRepo.getUserFileImage(userId);

    // if (userAvatar) {
    //   await this.s3Manager.deleteImage(userAvatar.url);
    //   await this.profileRepo.deleteProfileAvatar(userAvatar.url);
    // }
    const a = this.createFileImage(fileSize, buffer, userId, extension);
    console.log(a);
    return a;
  }
  createFileImage(
    fileSize: number,
    buffer: Buffer,
    userId: number,
    extension: string,
  ) {
    const url = `media/users/${userId}/avatars/${userId}-avatar-${Date.now()}.${extension}`;
    const pattern = { cmd: MicroserviceMessagesEnum.UPLOAD_AVATAR };
    const payload = {
      userId,
      buffer,
      url,
      fileSize,
    };
    return this.client.send(pattern, payload);
  }
}
