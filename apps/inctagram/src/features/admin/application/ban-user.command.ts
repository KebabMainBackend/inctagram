import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../db/users.repository';
import { BanStatus } from '../../../types/ban.types';

export class ChangeBanStatusOfUserCommand {
  constructor(
    public userId: number,
    public status: BanStatus,
    public reason: string,
  ) {}
}

@CommandHandler(ChangeBanStatusOfUserCommand)
export class ChangeBanStatusOfUserHandler
  implements ICommandHandler<ChangeBanStatusOfUserCommand>
{
  constructor(private usersRepo: UsersRepository) {}

  async execute({ userId, status, reason }: ChangeBanStatusOfUserCommand) {
    console.log(status, reason, userId);
    const user = await this.usersRepo.getUserById(userId);
    if (user) {
      await this.usersRepo.changeBanStatusOfUser(userId, status, reason);
      return true;
    }
    return false;
  }
}
