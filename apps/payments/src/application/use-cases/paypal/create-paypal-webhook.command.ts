import {
  AddNewSubscriptionTypeDto,
  CreatePaypalWebhookDto,
} from '../../../api/dto/product.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { PaypalAdapter } from '../../../common/adapters/paypal.adapter';
import { getPaypalRequestHeaders } from '../../dto/paypal.dto';

export class CreatePaypalWebhookCommand {
  constructor(public url: string) {}
}

@CommandHandler(CreatePaypalWebhookCommand)
export class CreatePaypalWebhookHandler
  implements ICommandHandler<CreatePaypalWebhookCommand>
{
  public token: string;
  constructor(
    private configService: ConfigService,
    private paypalAdapter: PaypalAdapter,
  ) {
    this.token = Buffer.from(
      `${this.configService.get('PAYPAL_CLIENT_ID')}:${this.configService.get(
        'PAYPAL_CLIENT_SECRET',
      )}`,
    ).toString('base64');
  }

  async execute(payload: CreatePaypalWebhookCommand) {
    try {
      const { url } = payload;

      const webhookResponse = await fetch(
        'https://api-m.sandbox.paypal.com/v1/notifications/webhooks',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${this.token}`,
          },
          body: JSON.stringify({
            url: `${url}`,
            event_types: [
              {
                name: 'PAYMENT.SALE.COMPLETED',
              },
            ],
          }),
        },
      );
      const webhook = await webhookResponse.json();
      console.log(webhook);
      return webhook;
    } catch (e) {
      console.log(e);
    }
  }
}
