import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProfileRepository } from '../../db/profile.repository';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceMessagesEnum } from '../../../../../../../types/messages';

export class DeleteAvatarCommand {
  constructor(public userId: number) {}
}

@CommandHandler(DeleteAvatarCommand)
export class DeleteAvatarHandler
  implements ICommandHandler<DeleteAvatarCommand>
{
  constructor(
    private profileRepo: ProfileRepository,

    @Inject('FILES_SERVICE') private client: ClientProxy,
  ) {}

  async execute({ userId }: DeleteAvatarCommand) {
    const profile = await this.profileRepo.getUserProfile(userId);
    if (profile) {
      this.deleteFromMS(userId).subscribe();
      await this.profileRepo.removeAvatarFromProfile(userId);
    }
  }
  deleteFromMS(userId: number) {
    const pattern = { cmd: MicroserviceMessagesEnum.DELETE_AVATAR };
    const payload = {
      ownerId: userId,
    };
    return this.client.send(pattern, payload);
  }
}
