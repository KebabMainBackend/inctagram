import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAutoRenewalStatusDto } from '../../api/dto/subscription.dto';
import { StripeAdapter } from '../../common/adapters/stripe.adapter';
import { SubscriptionRepository } from '../../db/subscription.repository';
import Stripe from 'stripe';
import { CreateStripeCustomerCommand } from './stripe/create-stripe-customer.command';
import { PrismaService } from '../../prisma.service';

export class UpdateAutoRenewalStatusCommand {
  constructor(
    public userId: number,
    public payload: UpdateAutoRenewalStatusDto,
  ) {}
}

@CommandHandler(UpdateAutoRenewalStatusCommand)
export class UpdateAutoRenewalStatusHandler
  implements ICommandHandler<UpdateAutoRenewalStatusCommand>
{
  constructor(
    private subscriptionRepository: SubscriptionRepository,
    private stripeAdapter: StripeAdapter,
    private commandBus: CommandBus,
    private prisma: PrismaService,
  ) {}

  async execute({ payload, userId }: UpdateAutoRenewalStatusCommand) {
    const { subscriptionId, autoRenewal } = payload;
    const subscription = await this.subscriptionRepository.getSubscriptionByID(
      subscriptionId,
    );

    if (!subscription) return;

    await this.updateAutoRenewalStatus(subscription, autoRenewal, userId);
  }

  async updateAutoRenewalStatus(product, autoRenewal: boolean, userId: number) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    if (!product) return;
    // if(!dbSubscription.autoRenewal && !autoRenewal) return

    const customer = await this.commandBus.execute(
      new CreateStripeCustomerCommand(userId, product.profile.user.email),
    );

    if (autoRenewal) {
      const subscription = await stripe.subscriptions.create({
        customer: customer.customerId,
        cancel_at_period_end: !autoRenewal,
        items: [{ price: product.subscriptionPriceId }],
        trial_end: Math.floor(product.dateOfNextPayment.getTime() / 1000),
      });

      //1
      await this.prisma.subscription.update({
        where: { userId, subscriptionId: product.subscriptionId },
        data: { stripeSubscriptionId: subscription.id, autoRenewal },
      });
      //1
    } else {
      await stripe.subscriptions.update(product.stripeSubscriptionId, {
        cancel_at_period_end: !autoRenewal,
        metadata: { key: process.env.STRIPE_API_KEY },
      });

      //1
      await this.prisma.subscription.update({
        where: { userId, subscriptionId: product.subscriptionId },
        data: { stripeSubscriptionId: null, autoRenewal },
      });
      //1
    }

    const autoRenewalOnSubscriptions = await this.prisma.subscription.findMany({
      where: { userId, autoRenewal: true },
      orderBy: [{ dateOfNextPayment: 'asc' }],
    });

    if (autoRenewalOnSubscriptions.length) {
      await this.prisma.currentSubscription.update({
        where: { userId },
        data: { hasAutoRenewal: autoRenewal },
      });
    }
  }
}
