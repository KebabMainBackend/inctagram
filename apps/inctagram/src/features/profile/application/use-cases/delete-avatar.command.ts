import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../../prisma.service';
import { ProfileRepository } from '../../db/profile.repository';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceMessagesEnum } from '../messages';

export class DeleteAvatarCommand {
  constructor(public userId: number) {}
}

@CommandHandler(DeleteAvatarCommand)
export class DeleteAvatarHandler
  implements ICommandHandler<DeleteAvatarCommand>
{
  constructor(
    private prisma: PrismaService,
    private profileRepo: ProfileRepository,

    @Inject('FILES_SERVICE') private client: ClientProxy,
  ) {}

  async execute({ userId }: DeleteAvatarCommand) {
    const profile = await this.profileRepo.getUserProfile(userId);
    if (profile) {
      this.deleteFromMS(profile.avatarId).subscribe();
      await this.profileRepo.removeAvatarFromProfile(userId);
    }
  }
  deleteFromMS(avatarId: string) {
    const pattern = { cmd: MicroserviceMessagesEnum.DELETE_AVATAR };
    const payload = {
      fileId: avatarId,
    };
    return this.client.send(pattern, payload);
  }
}
