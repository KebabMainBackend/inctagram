import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HttpStatus } from '@nestjs/common';
import { EmailService } from '../../../../inctagram/src/auth/managers/email.manager';
import { format, parseISO } from 'date-fns';
import { SubscriptionRepository } from '../../db/subscription.repository';
import { PrismaService } from '../../prisma.service';

export class GetCurrentSubscriptionInfoCommand {
  constructor(public userId: number) {}
}

@CommandHandler(GetCurrentSubscriptionInfoCommand)
export class GetCurrentSubscriptionInfoHandler
  implements ICommandHandler<GetCurrentSubscriptionInfoCommand>
{
  constructor(
    public prisma: PrismaService,
    public emailService: EmailService,
    private subscriptionRepo: SubscriptionRepository,
  ) {}

  async execute(command: GetCurrentSubscriptionInfoCommand) {
    const { userId } = command;

    const current = await this.subscriptionRepo.getCurrentSubscription(userId);
    if (!current) return { errorCode: HttpStatus.NOT_FOUND };

    if (current.expireAt < new Date()) {
      await this.subscriptionHasExpired(userId, current.profile.user.email);
      return {
        errorCode: HttpStatus.NOT_FOUND,
        message: 'Subscription expired',
      };
    }
    const subscriptions = await this.subscriptionRepo.getSubscriptions(userId);
    if (subscriptions.length) {
      const expireAtFormatted = format(
        parseISO(current.expireAt.toISOString()),
        'dd.MM.yyyy',
      );
      const nextPaymentFormatted = format(
        parseISO(subscriptions[0].dateOfNextPayment.toISOString()),
        'dd.MM.yyyy',
      );

      if (!current.hasAutoRenewal) {
        return {
          subscription: subscriptions[0],
          expireAt: expireAtFormatted,
        };
      } else if (current.hasAutoRenewal) {
        return {
          subscription: subscriptions[0],
          expireAt: expireAtFormatted,
          nextPayment: nextPaymentFormatted,
        };
      }
    }
    return null;
  }

  async subscriptionHasExpired(userId: number, userEmail: string) {
    await this.prisma.profile.update({
      where: { userId },
      data: {
        accountType: 'PERSONAL',
      },
    });
    await this.emailService.sendSubscriptionHasExpiredEmail(userEmail);
  }
}
