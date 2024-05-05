import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CreateSubscriptionDto,
  UpdateAutoRenewalStatusDto,
} from '../../api/dto/subscription.dto';
import { StripeAdapter } from '../../common/adapters/stripe.adapter';
import { SubscriptionRepository } from '../../db/subscription.repository';
import Stripe from 'stripe';
import { CreateStripeCustomerCommand } from './stripe/create-stripe-customer.command';
import { PrismaService } from '../../prisma.service';
import { BadRequestException } from '@nestjs/common';
import {
  existedAutoRenewalStatus,
  incorrectSubscriptionId,
} from '../../errorsMessages';
import { PaypalAdapter } from '../../common/adapters/paypal.adapter';
import { SubscriptionEntity } from '../../db/domain/subscription.entity';

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
    private paypalAdapter: PaypalAdapter,
    private commandBus: CommandBus,
    private prisma: PrismaService,
  ) {}

  // если ауто реневал может быт ьтолько один
  // то можно отменять предыдущую подписку и создавать новую на план с автопродлением

  async execute({ payload, userId }: UpdateAutoRenewalStatusCommand) {
    const { subscriptionId, autoRenewal } = payload;
    const subscription: SubscriptionEntity =
      await this.subscriptionRepository.getSubscriptionByID(subscriptionId);

    if (!subscription) throw new BadRequestException(incorrectSubscriptionId);

    if (subscription.autoRenewal === autoRenewal)
      throw new BadRequestException(existedAutoRenewalStatus);

    if (subscription.paymentSystem === 'Stripe')
      await this.updateAutoRenewalStatus(subscription, autoRenewal, userId);
    else if (subscription.paymentSystem === 'Paypal') {
      const paypalSubscriptionId = subscription.paypalSubscriptionId;

      const cancelledSubscription = await this.paypalAdapter.cancelSubscription(
        paypalSubscriptionId,
      );

      const newPaypalSubscription = await this.paypalAdapter.subscribeUser(
        userId,
        cancelledSubscription.plan_id,
        autoRenewal,
      );

      // надо добавить trial периоды для подписок с auto renewal на основе expireAt

      const subscriptionDto =
        CreateSubscriptionDto.createSubscriptionDtoByOldSubscription(
          subscription,
        );

      const newDbSubscription = SubscriptionEntity.create(
        subscriptionDto,
        autoRenewal,
      );

      await this.subscriptionRepository.addSubscriptionToDB(newDbSubscription);
    }

    await this.subscriptionRepository.updateCurrentSubscriptionHasAutoRenewalStatus(
      userId,
      autoRenewal,
    );

    return 'Auto renewal status was updated successfully!';
  }

  async updateAutoRenewalStatus(
    dbSubscription,
    autoRenewal: boolean,
    userId: number,
  ) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const customer = await this.commandBus.execute(
      new CreateStripeCustomerCommand(
        userId,
        dbSubscription.profile.user.email,
      ),
    );

    if (autoRenewal && !dbSubscription.stripeSubscriptionId) {
      const subscription = await stripe.subscriptions.create({
        customer: customer.stripeCustomerId,

        cancel_at_period_end: !autoRenewal,
        items: [{ price: dbSubscription.subscriptionPriceId }],
        trial_end: Math.floor(
          dbSubscription.dateOfNextPayment.getTime() / 1000,
        ),
      });

      await this.prisma.subscription.update({
        where: { subscriptionId: dbSubscription.subscriptionId },
        data: { stripeSubscriptionId: subscription.id, autoRenewal },
      });
    } else {
      await stripe.subscriptions.update(dbSubscription.stripeSubscriptionId, {
        cancel_at_period_end: !autoRenewal,
        metadata: { key: process.env.STRIPE_API_KEY },
      });

      await this.prisma.subscription.update({
        where: { subscriptionId: dbSubscription.subscriptionId },
        data: { autoRenewal },
      });
    }
  }
}
