import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma.service';
import { EmailService } from '../../../../auth/managers/email.manager';

export class ChangeAccountTypeAndSendMessageCommand {
  constructor(public userId: number) {}
}

@CommandHandler(ChangeAccountTypeAndSendMessageCommand)
export class ChangeAccountTypeAndSendMessageUseCase
  implements ICommandHandler<ChangeAccountTypeAndSendMessageCommand>
{
  constructor(
    private emailAdapter: EmailService,
    private prisma: PrismaService,
  ) {}

  async execute({
    userId,
  }: ChangeAccountTypeAndSendMessageCommand): Promise<boolean | void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    console.log(user);
    //обновить статус профиля
    if (user) {
      await this.emailAdapter.sendSubscriptionHasExpiredEmail(user.email);
    } else {
      throw new BadRequestException({
        field: 'userId',
        message: 'Bad user id',
      });
    }
  }
}
