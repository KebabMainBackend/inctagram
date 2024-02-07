import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../prisma.service';
import { EmailService } from '../managers/email.manager';
import { UsersQueryRepository } from '../db/users.query-repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import { createErrorMessage } from '../../utils/create-error-object';

export class PasswordRecoveryCommand {
  constructor(public email: string) {}
}

@CommandHandler(PasswordRecoveryCommand)
export class PasswordRecoveryHandler
  implements ICommandHandler<PasswordRecoveryCommand>
{
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private usersQueryRepo: UsersQueryRepository,
  ) {}
  async execute({ email }: PasswordRecoveryCommand) {
    const userByEmail = await this.usersQueryRepo.getUserByEmail(email);
    const newConfirmationCode = uuidv4();
    const userConfirmation = {
      isConfirmed: false,
      confirmationCode: newConfirmationCode,
      codeExpirationDate: add(new Date(), {
        minutes: 3,
      }),
    };
    if (!userByEmail) {
      const error = createErrorMessage('incorrect email', 'email');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    return this.prisma.$transaction(
      async (tx) => {
        await tx.user.update({
          where: { id: userByEmail.id },
          data: userConfirmation,
        });
        await this.emailService.sendRecoveryCodeEmail(
          email,
          newConfirmationCode,
          'Recovery code',
        );

        return true;
      },
      {
        timeout: 6000,
      },
    );
  }
}
