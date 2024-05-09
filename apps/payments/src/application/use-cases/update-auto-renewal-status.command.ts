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
  incorrectSubscriptionId, wrongEntityOwner
} from "../../errorsMessages";
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
  ) {}

  async execute({ payload, userId }: UpdateAutoRenewalStatusCommand) {
    const { subscriptionId, autoRenewal } = payload;

    const subscription =
      await this.subscriptionRepository.getSubscriptionByID(subscriptionId);

    const currentSubscription =
      await this.subscriptionRepository.getCurrentSubscription(userId)

    if(!subscription)
      throw new BadRequestException(incorrectSubscriptionId);
    if(subscription.userId !== userId)
      throw new BadRequestException(wrongEntityOwner)
    if(subscription.autoRenewal === autoRenewal)
      throw new BadRequestException(existedAutoRenewalStatus);

    let stripeSubscriptionId: string | null = null
    let paypalSubscriptionId: string | null = null

    if (subscription.paymentSystem === 'Stripe') {
      const customer = await this.commandBus.execute(
        new CreateStripeCustomerCommand(
          userId,
          subscription.profile.user.email,
        ),
      );

      stripeSubscriptionId =
        await this.stripeAdapter.updateAutoRenewalStatus(
          subscription,
          autoRenewal,
          customer
        )
    }
    else if (subscription.paymentSystem === 'Paypal') {
      const startTime = autoRenewal ?
          currentSubscription.expireAt
        : null

      paypalSubscriptionId =
        await this.paypalAdapter.updateAutoRenewalStatus(
          subscription,
          autoRenewal,
          startTime
        )
    }

    await this.subscriptionRepository.updateSubscriptionInfo(
      subscriptionId,
      stripeSubscriptionId,
      paypalSubscriptionId,
      autoRenewal
      )

    await this.subscriptionRepository.updateCurrentSubscriptionHasAutoRenewalStatus(
      userId,
      autoRenewal,
    );

    return 'Auto renewal status was updated successfully!';
  }
}
