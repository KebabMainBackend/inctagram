import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StripeAdapter } from '../../common/adapters/stripe.adapter';
import { SubscriptionRepository } from '../../db/subscription.repository';
import { PrismaService } from '../../prisma.service';

export class FinishStripePaymentCommand {
  constructor(
    public signature: string,
    public rawBody: Buffer,
  ) {}
}

@CommandHandler(FinishStripePaymentCommand)
export class FinishStripePaymentHandler
  implements ICommandHandler<FinishStripePaymentCommand>
{
  constructor(
    private subscriptionRepo: SubscriptionRepository,
    private stripeAdapter: StripeAdapter,
    private prisma: PrismaService,
  ) {}

  async execute(payload: FinishStripePaymentCommand) {
    const data = await this.stripeAdapter.checkPayment(payload);
    if (data) {
      const metadata = data.data.metadata;
      const email = data.data.customer_details.email;
      const currentSubscription =
        JSON.parse(metadata.currentSubscription) || null;
      const renewSubscription = JSON.parse(metadata.renewSubscriptionData);
      const newSubscription = JSON.parse(metadata.newSubscription);
      await this.addSubscriptionToDB({
        userId: +metadata.userId,
        currentSubscription,
        dateOfNextPayment: renewSubscription.dateOfNextPayment,
        expireAt: renewSubscription.expireAt,
        newSubscription,
      });
      return { userId: +metadata.userId, email };
    }
  }
  private async addSubscriptionToDB({
    userId,
    currentSubscription,
    dateOfNextPayment,
    expireAt,
    newSubscription,
  }) {
    if (currentSubscription) {
      await this.prisma.currentSubscription.update({
        where: { userId },
        data: { dateOfNextPayment, expireAt },
      });
    } else {
      await this.prisma.currentSubscription.create({
        data: { userId, expireAt, dateOfNextPayment },
      });
    }

    await this.prisma.subscription.create({ data: newSubscription });
  }
}
