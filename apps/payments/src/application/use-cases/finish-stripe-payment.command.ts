import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StripeAdapter } from '../../common/adapters/stripe.adapter';
import { SubscriptionRepository } from '../../db/subscription.repository';

export class FinishStripePaymentCommand {
  constructor(public payload: any) {}
}

@CommandHandler(FinishStripePaymentCommand)
export class FinishStripePaymentHandler
  implements ICommandHandler<FinishStripePaymentCommand>
{
  constructor(
    private subscriptionRepo: SubscriptionRepository,
    private stripeAdapter: StripeAdapter,
  ) {}

  async execute({ payload }: FinishStripePaymentCommand) {
    const { dataPayment, data } = await this.stripeAdapter.checkPayment(
      payload,
    );
    console.log(dataPayment, data);
    // if (dataParsed.type === 'checkout.session.completed') {
    //   const payload = JSON.parse(data.data.object.metadata.payload);
    //   const productInfo = JSON.parse(data.data.object.metadata.productInfo);
    //
    //   return this.subscriptionRepository.addSubscriptionToDB(
    //     payload,
    //     productInfo,
    //     Number(data.data.object.metadata.userId),
    //   );
    // }
  }
  private async addSubscriptionToDB(
    userId,
    currentSubscription,
    dateOfNextPayment,
    expireAt,
    newSubscription,
  ) {
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
