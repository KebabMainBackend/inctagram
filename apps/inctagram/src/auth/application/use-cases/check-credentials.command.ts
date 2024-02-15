import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserHashingManager } from '../../managers/user-hashing.manager';
import { UsersRepository } from '../../db/users.repository';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CheckCredentialsCommand {
  constructor(
    public email: string,
    public password: string,
  ) {}
}

@CommandHandler(CheckCredentialsCommand)
export class CheckCredentialsHandler
  implements ICommandHandler<CheckCredentialsCommand>
{
  constructor(
    private userHashingManager: UserHashingManager,
    private usersRepo: UsersRepository,
  ) {}
  async execute({ email, password }: CheckCredentialsCommand) {
    const user = await this.usersRepo.getUserByEmail(email);
    if (user) {
      const passwordHash = await this.userHashingManager.generateHash(
        password,
        user.passwordSalt,
      );
      if (!user.isConfirmed) {
        throw new HttpException(
          'email is not confirmed',
          HttpStatus.UNAUTHORIZED,
        );
      }
      if (user.passwordHash === passwordHash) {
        return user.id;
      }
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
