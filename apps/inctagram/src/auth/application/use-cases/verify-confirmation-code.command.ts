import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../db/users.repository';
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
      throw new HttpException('invalid code', HttpStatus.BAD_REQUEST);
    }
    if (user.confirmationData.codeExpirationDate < new Date()) {
      throw new HttpException('code expired', HttpStatus.BAD_REQUEST);
    }
    if (user.isConfirmed) {
      throw new HttpException('code already confirmed', HttpStatus.BAD_REQUEST);
    }
    await this.usersRepo.updateUsersConfirmationStatus(user.id);
  }
}
