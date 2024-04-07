import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../prisma.service';
import { EmailService } from '../../managers/email.manager';
import { HttpException, HttpStatus } from '@nestjs/common';
import { createErrorMessage } from '../../../utils/create-error-object';
import { UsersRepository } from '../../db/users.repository';
import { ConfigService } from '@nestjs/config';
import { UserConfirmationEntity } from '../../domain/entities/user.entity';
import { LanguageEnums } from '../../../types';

export class PasswordRecoveryCommand {
  constructor(
    public email: string,
    public recaptcha: string,
    public language: LanguageEnums,
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
    private configService: ConfigService,
  ) {}
  async execute({ email, recaptcha, language }: PasswordRecoveryCommand) {
    const secretKey = this.configService.get('RECAPTCHA_SECRET');
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
      return this.recoverPassword(email, language);
    }
    const error = createErrorMessage(
      requestStatus['error-codes'][0],
      'recaptcha',
    );
    throw new HttpException(error, HttpStatus.BAD_REQUEST);
  }
  private async recoverPassword(email: string, language: LanguageEnums) {
    const user = await this.usersRepo.getUserByEmail(email);
    if (!user) {
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.prisma.$transaction(
      async () => {
        try {
          const confirmationData =
            await this.createOrUpdateUserConfirmationDate(user);
          await this.emailService.sendRecoveryCodeEmail(
            email,
            confirmationData.confirmationCode,
            language,
          );
          return true;
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
  private async createOrUpdateUserConfirmationDate(user: any) {
    if (user.confirmationData) {
      const confirmationData = await this.usersRepo.getUserConfirmation(
        user.confirmationData.id,
      );
      confirmationData.updateConfirmationData();
      await this.usersRepo.updateConfirmationDate(confirmationData);

      return confirmationData;
    }
    const userConfirmation = UserConfirmationEntity.create(user.id);
    await this.usersRepo.createUserConfirmationData(userConfirmation);
    return userConfirmation;
  }
}
