import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../prisma.service';
import { EmailService } from '../../managers/email.manager';
import { HttpException, HttpStatus } from '@nestjs/common';
import { createErrorMessage } from '../../../utils/create-error-object';
import { UsersRepository } from '../../db/users.repository';
import { LanguageEnums } from '../../../types';

export class ResendRecoveryCodeCommand {
  constructor(
    public email: string,
    public language: LanguageEnums,
  ) {}
}

@CommandHandler(ResendRecoveryCodeCommand)
export class ResendRecoveryCodeHandler
  implements ICommandHandler<ResendRecoveryCodeCommand>
{
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private usersRepo: UsersRepository,
  ) {}
  async execute({ email, language }: ResendRecoveryCodeCommand) {
    return this.recoverPassword(email, language);
  }
  private async recoverPassword(email: string, language: LanguageEnums) {
    const user = await this.usersRepo.getUserByEmail(email);
    if (!user) {
      const error = createErrorMessage(
        'User with this email does not exist',
        'email',
      );
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    return this.prisma.$transaction(
      async () => {
        try {
          const confirmationData = await this.usersRepo.getUserConfirmation(
            user.confirmationData.id,
          );
          confirmationData.updateConfirmationData();
          await this.usersRepo.updateConfirmationDate(confirmationData);
          await this.emailService.sendRecoveryCodeEmail(
            email,
            confirmationData.confirmationCode,
            language,
          );
        } catch (e) {
          console.log(e);
          throw Error('some error try later');
        }
      },
      {
        timeout: 6000,
      },
    );
  }
}
