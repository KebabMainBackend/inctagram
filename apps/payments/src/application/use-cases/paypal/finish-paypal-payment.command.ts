import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SubscriptionRepository } from '../../../db/subscription.repository';
import { PaypalAdapter } from '../../../common/adapters/paypal.adapter';
import { SubscriptionEntity } from '../../../db/domain/subscription.entity';
import { ConfigService } from '@nestjs/config';
import { CreateSubscriptionDto } from '../../../api/dto/subscription.dto';
import { PaymentsEntity } from '../../../db/domain/payments.entity';

export class FinishPaypalPaymentCommand {
  constructor(public body: any) {}
}

@CommandHandler(FinishPaypalPaymentCommand)
export class FinishPaypalPaymentHandler
  implements ICommandHandler<FinishPaypalPaymentCommand>
{
  public token: string;
  constructor(
    private subscriptionRepo: SubscriptionRepository,
    private paypalAdapter: PaypalAdapter,
    private configService: ConfigService,
  ) {
    this.token = Buffer.from(
      `${this.configService.get('PAYPAL_CLIENT_ID')}:${this.configService.get(
        'PAYPAL_CLIENT_SECRET',
      )}`,
    ).toString('base64');
  }

  async execute(payload: FinishPaypalPaymentCommand) {
    try {
      console.log('вебхук сработал');
      const data = payload.body.payload.resource;

      if (payload.body.payload.event_type === 'BILLING.PLAN.CREATED') {
        console.log(data);
      }

      if (payload.body.payload.event_type === 'PAYMENT.SALE.COMPLETED') {
        const paypalSubscriptionId = data.billing_agreement_id;

        if (
          await this.subscriptionRepo.getSubscriptionByPaypalSubId(
            paypalSubscriptionId,
          )
        )
          return;

        const { plan, userId } =
          await this.paypalAdapter.getPaypalSubscriptionInfo(
            this.token,
            paypalSubscriptionId,
          );

        const subscriptionDto = CreateSubscriptionDto.createSubscriptionDto(
          plan,
          'Paypal',
          paypalSubscriptionId,
          +userId,
        );

        const subscription = SubscriptionEntity.create(subscriptionDto);
        const payment = PaymentsEntity.create(
          'Paypal',
          plan,
          subscription.dateOfNextPayment,
          +userId,
        );

        await this.subscriptionRepo.addSubscriptionToDB(subscription);
        await this.subscriptionRepo.addPaymentToDB(payment);

        const currentSubscription =
          await this.subscriptionRepo.getCurrentSubscription(+userId);

        const newExpirationDate = SubscriptionEntity.getNewExpireAt(
          currentSubscription.expireAt,
          subscription.period,
        );

        await this.subscriptionRepo.updateCurrentSubscription({
          userId: +userId,
          currentSubscription,
          dateOfNextPayment: newExpirationDate,
          expireAt: newExpirationDate,
        });

        return {
          userId: +userId,
          email: currentSubscription.profile.user.email,
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
}
