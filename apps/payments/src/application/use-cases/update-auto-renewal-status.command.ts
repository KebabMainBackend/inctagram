import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAutoRenewalStatusDto } from '../../api/dto/subscription.dto';
import { StripeAdapter } from '../../common/adapters/stripe.adapter';
import { SubscriptionRepository } from '../../db/subscription.repository';
import Stripe from 'stripe';
import { CreateStripeCustomerCommand } from './stripe/create-stripe-customer.command';
import { PrismaService } from '../../prisma.service';
import { BadRequestException } from "@nestjs/common";
import { existedAutoRenewalStatus, incorrectSubscriptionId } from "../../errorsMessages";

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
    const product =
      await this.subscriptionRepository.getSubscriptionByID(subscriptionId)

    if (!product)
      throw new BadRequestException(incorrectSubscriptionId)

    if(product.autoRenewal === autoRenewal)
      throw new BadRequestException(existedAutoRenewalStatus)

    if(product.paymentSystem === 'Stripe')
      await this.updateAutoRenewalStatus(product, autoRenewal, userId);

    else if(product.paymentSystem === 'Paypal') {
      const paypalSubscriptionId = product.paypalSubscriptionId

      
    }

    await this.subscriptionRepository
      .updateCurrentSubscriptionHasAutoRenewalStatus(userId, autoRenewal)
  }

  async updateAutoRenewalStatus(dbSubscription, autoRenewal: boolean, userId: number) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const customer = await this.commandBus.execute(
      new CreateStripeCustomerCommand(userId, dbSubscription.profile.user.email),
    )

    if (autoRenewal && !dbSubscription.stripeSubscriptionId) {
      const subscription =
        await stripe.subscriptions.create({
        customer: customer.customerId,
        cancel_at_period_end: !autoRenewal,
        items: [{ price: dbSubscription.subscriptionPriceId }],
        trial_end: Math.floor(dbSubscription.dateOfNextPayment.getTime() / 1000),
      })


      await this.prisma.subscription.update({
        where: { subscriptionId: dbSubscription.subscriptionId },
        data: { stripeSubscriptionId: subscription.id, autoRenewal },
      })

    } else {
      await stripe.subscriptions.update(dbSubscription.stripeSubscriptionId, {
        cancel_at_period_end: !autoRenewal,
        metadata: { key: process.env.STRIPE_API_KEY },
      })

      await this.prisma.subscription.update({
        where: { subscriptionId: dbSubscription.subscriptionId },
        data: { autoRenewal },
      })
    }
  }
}
