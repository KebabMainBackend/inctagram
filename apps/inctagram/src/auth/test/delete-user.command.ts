import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../db/users.repository';

export class TestDeleteUserCommand {
  constructor() {}
}

@CommandHandler(TestDeleteUserCommand)
export class TestDeleteUserHandler
  implements ICommandHandler<TestDeleteUserCommand>
{
  constructor(private usersRepo: UsersRepository) {}
  async execute() {
    const me = await this.usersRepo.getUserByEmail('default@gmail.com');
    if (me) {
      await this.usersRepo.deleteUserByEmail('default@gmail.com', me.id);
    }
  }
}
