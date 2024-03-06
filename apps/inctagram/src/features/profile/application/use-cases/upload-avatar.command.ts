import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../../prisma.service';
import { ProfileRepository } from '../../db/profile.repository';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceMessagesEnum } from '../messages';
import { firstValueFrom } from 'rxjs';
import { mapUserImages } from '../../db/view/mapUserProfile';

export class UploadAvatarCommand {
  constructor(
    public buffer: Buffer,
    public userId: number,
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

  async execute({ buffer, userId }: UploadAvatarCommand) {
    const userProfile = await this.profileRepo.getUserProfile(userId);
    if (userProfile.avatarId) {
      this.deleteFileImage(userProfile.avatarId).subscribe();
    }
    const data = await firstValueFrom(
      await this.createFileImage(buffer, userId),
    );
    const avatarId = data.avatars.find((x) => x.type === 'avatar').fileId;
    const thumbnailId = data.avatars.find((x) => x.type === 'thumbnail').fileId;
    await this.profileRepo.addAvatarToProfile(avatarId, thumbnailId, userId);
    return mapUserImages(data.avatars);
  }
  async createFileImage(buffer: Buffer, userId: number) {
    const pattern = { cmd: MicroserviceMessagesEnum.UPLOAD_AVATAR };
    const payload = {
      userId,
      buffer,
    };
    return this.client.send(pattern, payload);
  }
  deleteFileImage(avatarId: string) {
    const pattern = { cmd: MicroserviceMessagesEnum.DELETE_AVATAR };
    const payload = {
      fileId: avatarId,
    };
    return this.client.send(pattern, payload);
  }
}
