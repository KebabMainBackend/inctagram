import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserHashingManager } from '../../managers/user-hashing.manager';
import { UsersRepository } from '../../db/users.repository';
import { createErrorMessage } from '../../../utils/create-error-object';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ChangeUserPasswordCommand {
  constructor(
    public recoveryCode: string,
    public newPassword: string,
  ) {}
}

@CommandHandler(ChangeUserPasswordCommand)
export class ChangeUserPasswordHandler
  implements ICommandHandler<ChangeUserPasswordCommand>
{
  constructor(
    private userHashingManager: UserHashingManager,
    private usersRepo: UsersRepository,
  ) {}

  async execute({ recoveryCode, newPassword }: ChangeUserPasswordCommand) {
    const user = await this.usersRepo.getUserByCode(recoveryCode);
    if (!user) {
      const error = createErrorMessage('invalid recovery code', 'recoveryCode');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    // if (user.confirmationData.codeExpirationDate < new Date()) {
    //   const error = createErrorMessage('expired recovery code', 'recoveryCode');
    //   throw new HttpException(error, HttpStatus.BAD_REQUEST);
    // }
    const { passwordSalt, passwordHash } =
      await this.userHashingManager.getHashAndSalt(newPassword);

    return await this.usersRepo.updateUserPassword(
      user.id,
      passwordSalt,
      passwordHash,
    );
  }
}
