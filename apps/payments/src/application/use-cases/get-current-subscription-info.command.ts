import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HttpStatus } from '@nestjs/common';
import { EmailService } from '../../../../inctagram/src/auth/managers/email.manager';
import { differenceInDays } from 'date-fns';
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
      return await this.subscriptionHasExpired(
        userId,
        current.profile.user.email,
      );
    }

    const daysLeft = differenceInDays(new Date(current.expireAt), new Date());

    const subscriptions = await this.subscriptionRepo.getSubscriptions(userId);
    if (!current.hasAutoRenewal) {
      return {
        subscriptions,
        expireAt: daysLeft,
      };
    } else if (current.hasAutoRenewal) {
      return {
        subscriptions,
        expireAt: daysLeft,
        nextPayment: subscriptions[0].dateOfNextPayment,
      };
    }
  }

  async subscriptionHasExpired(userId: number, userEmail: string) {
    await this.prisma.profile.update({
      where: { userId },
      data: {
        accountType: 'PERSONAL',
      },
    });

    return await this.emailService.sendSubscriptionHasExpiredEmail(userEmail);
  }
}
