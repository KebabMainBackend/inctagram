import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../../prisma.service';
import { ProfileRepository } from '../../db/profile.repository';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
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
    console.log('mid');
    const { avatarId, url, width, height } = await firstValueFrom(
      this.createFileImage(fileSize, buffer, userId, extension),
    );
    await this.profileRepo.addAvatarToProfile(avatarId, userId);
    return {
      url,
      width,
      height,
      fileSize,
    };
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
    try {
      console.log('upload image');
      return this.client.send(pattern, payload);
    } catch (e) {
      console.log(e);
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
  deleteFileImage(avatarId: string) {
    const pattern = { cmd: MicroserviceMessagesEnum.DELETE_AVATAR };
    const payload = {
      fileId: avatarId,
    };
    try {
      console.log('delete image');
      return this.client.send(pattern, payload);
    } catch (e) {
      console.log(e);
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
