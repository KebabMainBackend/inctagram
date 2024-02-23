import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../../prisma.service';
import { S3StorageManager } from '../../managers/s3-storage.manager';
import { ProfileRepository } from '../../db/profile.repository';

export class DeleteAvatarCommand {
  constructor(public userId: number) {}
}

@CommandHandler(DeleteAvatarCommand)
export class DeleteAvatarHandler
  implements ICommandHandler<DeleteAvatarCommand>
{
  constructor(
    private prisma: PrismaService,
    private s3Manager: S3StorageManager,
    private profileRepo: ProfileRepository,
  ) {}

  async execute({ userId }: DeleteAvatarCommand) {
    const profileAvatar = await this.profileRepo.getUserFileImage(userId);
    await this.prisma.$transaction(async () => {
      if (profileAvatar) {
        await this.s3Manager.deleteImage(profileAvatar.url);
        await this.profileRepo.deleteProfileAvatar(profileAvatar.url);
      }
    });
  }
}
