import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma.service';
import { EmailService } from '../../../../auth/managers/email.manager';

export class ChangeAccountTypeAndSendMessageCommand {
  constructor(
    public userId: number,
    public email: string,
  ) {}
}

@CommandHandler(ChangeAccountTypeAndSendMessageCommand)
export class ChangeAccountTypeAndSendMessageHandler
  implements ICommandHandler<ChangeAccountTypeAndSendMessageCommand>
{
  constructor(
    private emailAdapter: EmailService,
    private prisma: PrismaService,
  ) {}

  async execute({
    userId,
    email,
  }: ChangeAccountTypeAndSendMessageCommand): Promise<boolean | void> {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });
    if (profile) {
      await this.prisma.profile.update({
        where: {
          userId,
        },
        data: {
          accountType: 'BUSINESS',
        },
      });
      await this.emailAdapter.sendSubscriptionHasExpiredEmail(email);
    } else {
      throw new BadRequestException({
        field: 'userId',
        message: 'Bad user id',
      });
    }
  }
}
