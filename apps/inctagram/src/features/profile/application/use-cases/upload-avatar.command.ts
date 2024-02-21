import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../../prisma.service';
import { S3StorageManager } from '../../managers/s3-storage.manager';
import { ProfileRepository } from '../../db/profile.repository';
import { FileImageEntity } from '../../domain/entities/file-image.entity';

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
  ) {}

  async execute({ buffer, userId, extension, fileSize }: UploadAvatarCommand) {
    const userAvatar = await this.profileRepo.getUserFileImage(userId);
    await this.prisma.$transaction(
      async () => {
        if (userAvatar) {
          await this.s3Manager.deleteImage(userAvatar.url);
          await this.profileRepo.deleteProfileAvatar(userAvatar.url);
        }
        await this.createFileImage(fileSize, buffer, userId, extension);
      },
      {
        timeout: 7000,
      },
    );
  }
  async createFileImage(
    fileSize: number,
    buffer: Buffer,
    userId: number,
    extension: string,
  ) {
    const { url } = await this.s3Manager.saveImage(userId, buffer, extension);
    const avatar = FileImageEntity.create(
      {
        fileSize,
        imageUrl: url,
        buffer,
      },
      userId,
    );
    await this.profileRepo.createProfileAvatar(avatar);
  }
}
