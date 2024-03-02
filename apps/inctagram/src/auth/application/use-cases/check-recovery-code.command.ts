import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../db/users.repository';
import { createErrorMessage } from '../../../utils/create-error-object';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CheckRecoveryCodeCommand {
  constructor(public code: string) {}
}

@CommandHandler(CheckRecoveryCodeCommand)
export class CheckRecoveryCodeHandler
  implements ICommandHandler<CheckRecoveryCodeCommand>
{
  constructor(private usersRepo: UsersRepository) {}
  async execute({ code }: CheckRecoveryCodeCommand) {
    const user = await this.usersRepo.getUserByCode(code);
    if (!user) {
      const error = createErrorMessage('invalid recovery code', 'recoveryCode');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    if (user.confirmationData.codeExpirationDate < new Date()) {
      const error = createErrorMessage('expired recovery code', 'recoveryCode');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    return { email: user.email };
  }
}
