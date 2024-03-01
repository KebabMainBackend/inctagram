import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../db/users.repository';
import { createErrorMessage } from '../../../utils/create-error-object';
import { HttpException, HttpStatus } from '@nestjs/common';

export class VerifyConfirmationCodeCommand {
  constructor(public code: string) {}
}

@CommandHandler(VerifyConfirmationCodeCommand)
export class VerifyConfirmationCodeHandler
  implements ICommandHandler<VerifyConfirmationCodeCommand>
{
  constructor(private usersRepo: UsersRepository) {}
  async execute({ code }: VerifyConfirmationCodeCommand) {
    const user = await this.usersRepo.getUserByCode(code);
    if (!user) {
      const error = createErrorMessage('invalid code', 'code');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    if (user.confirmationData.codeExpirationDate < new Date()) {
      const error = createErrorMessage('code expired', 'code');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    if (user.isConfirmed) {
      const error = createErrorMessage('code already confirmed', 'code');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    // await this.usersRepo.deleteUserConfirmationData(user.confirmationData.id);
    await this.usersRepo.updateUsersConfirmationStatus(user.id);
  }
}
