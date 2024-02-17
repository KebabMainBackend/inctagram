import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../../prisma.service';
import { S3StorageManager } from '../../managers/s3-storage.manager';
import { ProfileRepository } from '../../db/profile.repository';

export class UploadAvatarCommand {
  constructor(
    public buffer: Buffer,
    public mimetype: string,
    public extension: string,
    public userId: number,
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
  ) {}

  async execute({ buffer, userId, mimetype, extension }: UploadAvatarCommand) {
    await this.prisma.$transaction(async () => {
      const { url } = await this.s3Manager.saveImage(
        userId,
        buffer,
        mimetype,
        extension,
      );
      await this.profileRepo.updateProfileAvatar(userId, url);
    });
  }
}
