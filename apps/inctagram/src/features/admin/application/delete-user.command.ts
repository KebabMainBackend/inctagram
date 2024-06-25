import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../db/users.repository';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FilesMicroserviceMessagesEnum } from '../../../../../../types/messages';

export class DeleteUserCommand {
  constructor(public userId: number) {}
}

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private usersRepo: UsersRepository,
    @Inject('FILES_SERVICE') private client: ClientProxy,
  ) {}

  async execute({ userId }: DeleteUserCommand) {
    const user = await this.usersRepo.getUserById(userId);
    if (user) {
      const pattern = {
        cmd: FilesMicroserviceMessagesEnum.DELETE_USER_ALL_PHOTOS,
      };
      const payload = {
        ownerId: userId,
      };
      await this.usersRepo.deleteUserById(userId);
      this.client.send(pattern, payload);
      return true;
    }
    return null;
  }
}
