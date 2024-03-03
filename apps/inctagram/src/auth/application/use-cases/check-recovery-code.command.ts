import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../db/users.repository';
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
      throw new HttpException('invalid recovery code', HttpStatus.BAD_REQUEST);
    }
    if (user.confirmationData.codeExpirationDate < new Date()) {
      throw new HttpException('expired recovery code', HttpStatus.BAD_REQUEST);
    }
    return { email: user.email };
  }
}
