import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HttpException } from "@nestjs/common";
import { PrismaService } from "../../../../prisma.service";
import { EmailService } from "../../../../auth/managers/email.manager";

@CommandHandler(getCurrentSubscriptionInfoCommand)
export class getCurrentSubscriptionInfoCommand
  implements ICommandHandler<getCurrentSubscriptionInfoCommand> {
  constructor(public userId: number,
              public prisma: PrismaService,
              public EmailService: EmailService
              ) {}

  async execute(command:getCurrentSubscriptionInfoCommand) {

    const { userId } = command

    const current = await this.prisma.currentSubscription.findUnique({
      where: { userId },
      include: {
        profile: {
          include: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    if (!current) throw new HttpException('Not Found', 404);

    if (current.expireAt < new Date()) {
      return await this.subscriptionHasExpired(userId, current)
    }

    //@ts-ignore
    const differenceMS = new Date(current.expireAt) - new Date()

    const daysLeft = Math.floor(differenceMS / 86400000)

    const subscriptions =
      await this.prisma.subscription.findMany({
        where: {userId},
        orderBy: [{ dateOfNextPayment: 'asc'},
          {autoRenewal: 'asc',}]
      })

    if(!current.hasAutoRenewal) {
      return {
        subscriptions,
        expireAt: daysLeft
      };
    } else if(current.hasAutoRenewal) {
      return {
        subscriptions,
        expireAt: daysLeft,
        nextPayment: subscriptions[0].dateOfNextPayment,
      };
    }
  }

  async subscriptionHasExpired(userId, current) {
    await this.prisma.profile.update({
      where: { userId },
      data: {
        accountType: 'Personal',
      },
    });

    return await this.EmailService.sendSubscriptionHasExpiredEmail(
      current.profile.user.email,
    );
  }
}