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
      // if (!user.isConfirmed) {
      //   throw new HttpException(
      //     'email is not confirmed',
      //     HttpStatus.UNAUTHORIZED,
      //   );
      // }
      console.log(
        'file check-credentials-command проверка потверждён ли эмайл закомментирована',
      );
      if (user.passwordHash === passwordHash) {
        return user.id;
      }
    }
    throw new HttpException('wrong email or password', HttpStatus.BAD_REQUEST);
  }
}
