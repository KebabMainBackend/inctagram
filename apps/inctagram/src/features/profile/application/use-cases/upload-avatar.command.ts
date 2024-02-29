import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../../prisma.service';
import { ProfileRepository } from '../../db/profile.repository';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceMessagesEnum } from '../messages';
import { firstValueFrom } from 'rxjs';

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
    private profileRepo: ProfileRepository,
    @Inject('FILES_SERVICE') private client: ClientProxy,
  ) {}

  async execute({ buffer, userId, extension, fileSize }: UploadAvatarCommand) {
    const userProfile = await this.profileRepo.getUserProfile(userId);
    if (userProfile.avatarId) {
      this.deleteFileImage(userProfile.avatarId).subscribe();
    }
    console.log('after deleteion before upload');
    const { avatarId, url, width, height } = await firstValueFrom(
      await this.createFileImage(fileSize, buffer, userId, extension),
    );
    console.log(avatarId, 'avatarId');
    await this.profileRepo.addAvatarToProfile(avatarId, userId);
    return {
      url,
      width,
      height,
      fileSize,
    };
  }
  async createFileImage(
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
    console.log(url);
    const a = this.client.send(pattern, payload);
    console.log('b');
    const data = await firstValueFrom(a);
    console.log(data);
    return a;
  }
  deleteFileImage(avatarId: string) {
    const pattern = { cmd: MicroserviceMessagesEnum.DELETE_AVATAR };
    const payload = {
      fileId: avatarId,
    };
    return this.client.send(pattern, payload);
  }
}
