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
    const profile = await this.profileRepo.getUserProfile(userId);
    await this.prisma.$transaction(async () => {
      await this.s3Manager.deleteImage(profile.avatar.url);
      await this.profileRepo.deleteProfileAvatar(profile.avatar.url);
    });
  }
}
