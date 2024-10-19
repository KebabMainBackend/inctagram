import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProfileRepository } from '../../db/profile.repository';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FilesMicroserviceMessagesEnum } from '../../../../../../../types/messages';
import { firstValueFrom } from 'rxjs';
import { mapUserImages } from '../../db/view/mapUserProfile';
import { FileCommandTypesEnum } from '../../../../../../../types/file-image-enum.types';

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
    private profileRepo: ProfileRepository,
    @Inject('FILES_SERVICE') private client: ClientProxy,
  ) {}

  async execute({ buffer, userId }: UploadAvatarCommand) {
    const userProfile = await this.profileRepo.getUserProfile(userId);
    if (userProfile.avatarId) {
      this.deleteFileImage(userId).subscribe();
    }
    const data = await firstValueFrom(
      await this.createFileImage(buffer, userId),
    );
    const avatarId = data.avatars.find(
      (x) => x.type === FileCommandTypesEnum.AVATAR_MEDIUM,
    ).fileId;
    const thumbnailId = data.avatars.find(
      (x) => x.type === FileCommandTypesEnum.AVATAR_THUMBNAIL,
    ).fileId;
    await this.profileRepo.addAvatarToProfile(avatarId, thumbnailId, userId);
    return mapUserImages(data.avatars);
  }
  async createFileImage(buffer: Buffer, userId: number) {
    const pattern = { cmd: FilesMicroserviceMessagesEnum.UPLOAD_AVATAR };
    const payload = {
      userId,
      buffer,
    };
    return this.client.send(pattern, payload);
  }
  deleteFileImage(userId: number) {
    const pattern = { cmd: FilesMicroserviceMessagesEnum.DELETE_AVATAR };
    const payload = {
      ownerId: userId,
    };
    return this.client.send(pattern, payload);
  }
}
