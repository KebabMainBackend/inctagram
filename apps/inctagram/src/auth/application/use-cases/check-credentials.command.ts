import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserHashingManager } from '../../managers/user-hashing.manager';
import { UsersRepository } from '../../db/users.repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import { createErrorMessage } from '../../../utils/create-error-object';

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
      if (!user.passwordHash) {
        throw new HttpException(
          'create new password or login via Google/Github',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
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
    const error = createErrorMessage('wrong email or password', '');
    throw new HttpException(error, HttpStatus.BAD_REQUEST);
  }
}
