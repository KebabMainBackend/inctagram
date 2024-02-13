import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../prisma.service';
import { EmailService } from '../managers/email.manager';
import { UsersQueryRepository } from '../db/users.query-repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import { createErrorMessage } from '../../utils/create-error-object';
import { UserConfirmationEntity } from '../entities/user.entity';

export class ResendConfirmationCodeCommand {
  constructor(public email: string) {}
}

@CommandHandler(ResendConfirmationCodeCommand)
export class ResendConfirmationCodeHandler
  implements ICommandHandler<ResendConfirmationCodeCommand>
{
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private usersQueryRepo: UsersQueryRepository,
  ) {}
  async execute({ email }: ResendConfirmationCodeCommand) {
    const user = await this.usersQueryRepo.getUserByEmail(email);

    if (!user) {
      const error = createErrorMessage('incorrect email', 'email');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    if (user.isConfirmed) {
      const error = createErrorMessage('email already confirmed', 'email');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    return this.prisma.$transaction(
      async (tx) => {
        const userConfirmation = UserConfirmationEntity.create(user.id);
        await tx.userConfirmation.update({
          where: { id: user.confirmationData.id },
          data: userConfirmation,
        });
        await this.emailService.sendConfirmationCodeEmail(
          email,
          userConfirmation.confirmationCode,
          'New confirmation code',
        );

        return true;
      },
      {
        timeout: 6000,
      },
    );
  }
}
