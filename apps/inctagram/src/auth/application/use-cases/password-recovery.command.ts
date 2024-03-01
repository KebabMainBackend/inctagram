import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../prisma.service';
import { EmailService } from '../../managers/email.manager';
import { HttpException, HttpStatus } from '@nestjs/common';
import { createErrorMessage } from '../../../utils/create-error-object';
import { UsersRepository } from '../../db/users.repository';

export class PasswordRecoveryCommand {
  constructor(
    public email: string,
    public recaptcha: string,
  ) {}
}

@CommandHandler(PasswordRecoveryCommand)
export class PasswordRecoveryHandler
  implements ICommandHandler<PasswordRecoveryCommand>
{
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private usersRepo: UsersRepository,
  ) {}
  async execute({ email, recaptcha }: PasswordRecoveryCommand) {
    const secretKey = process.env['RECAPTCHA_SECRET'];
    const verifyCaptchaBodyString = `secret=${secretKey}&response=${recaptcha}`;
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: verifyCaptchaBodyString,
    });
    const requestStatus = await res.json();
    if (requestStatus.success) {
      return this.recoverPassword(email);
    }

    const error = createErrorMessage(
      requestStatus['error-codes'][0],
      'recaptcha',
    );
    throw new HttpException(error, HttpStatus.BAD_REQUEST);
  }
  private async recoverPassword(email: string) {
    const user = await this.usersRepo.getUserByEmail(email);
    if (!user) {
      const error = createErrorMessage('incorrect email', 'email');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    return this.prisma.$transaction(async () => {
      try {
        const confirmationData = await this.usersRepo.getUserConfirmation(
          user.confirmationData.id,
        );
        confirmationData.updateConfirmationData();
        await this.usersRepo.updateConfirmationDate(confirmationData);
        await this.emailService.sendRecoveryCodeEmail(
          email,
          confirmationData.confirmationCode,
        );
        return true;
      } catch (e) {
        console.log(e);
        throw Error('some error try later');
      }
    });
  }
}
