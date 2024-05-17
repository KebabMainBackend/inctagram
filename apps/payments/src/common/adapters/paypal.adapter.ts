import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  getPaypalDefaultHeaders,
  getPaypalRequestHeaders,
  getPlanDto,
  getSubscriptionDto,
} from '../../application/dto/paypal.dto';
import { ProductRepository } from '../../db/product.repository';
import { CreateSubscriptionDto } from '../../api/dto/subscription.dto';
import { SubscriptionEntity } from '../../db/domain/subscription.entity';
import { SubscriptionRepository } from '../../db/subscription.repository';

@Injectable()
export class PaypalAdapter {
  public token: string;
  public headers;
  constructor(
    private configService: ConfigService,
    private productRepository: ProductRepository,
  ) {
    this.token = Buffer.from(
      `${this.configService.get('PAYPAL_CLIENT_ID')}:${this.configService.get(
        'PAYPAL_CLIENT_SECRET',
      )}`,
    ).toString('base64');

    this.headers = getPaypalDefaultHeaders(this.token);
  }

  async createProduct(name, description) {
    const result = await fetch(
      'https://api-m.sandbox.paypal.com/v1/catalogs/products',
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: `${name}`,
          description: `${description}`,
          type: 'DIGITAL',
          category: 'DIRECT_MARKETING_SUBSCRIPTION',
        }),
      },
    );

    const product = await result.json();

    return product;
  }

  async createPlan(product, interval, price, currency, period) {
    const planDto = getPlanDto(product, interval, price, currency);

    const result = await fetch(
      'https://api-m.sandbox.paypal.com/v1/billing/plans',
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(planDto),
      },
    );

    const plan = await result.json();

    await this.productRepository.updateProduct(period, plan.id);

    return plan;
  }

  async subscribeUser(userId, planId, autoRenewal, startTime?: Date | null) {
    const subscriptionDto = getSubscriptionDto(
      planId,
      userId,
      this.configService.get('PAYMENT_SUCCESS_URL'),
      this.configService.get('PAYMENT_ERROR_URL'),
      autoRenewal,
      startTime,
    );

    const result = await fetch(
      'https://api-m.sandbox.paypal.com/v1/billing/subscriptions',
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(subscriptionDto),
      },
    );

    const subscription = await result.json();

    return subscription;
  }

  async cancelSubscription(paypalSubscriptionId) {
    await fetch(
      `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${paypalSubscriptionId}/cancel`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          reason: `Subscription was cancelled due to updating auto renewal status`,
        }),
      },
    );
  }

  async getPaypalSubscriptionInfo(paypalSubscriptionId) {
    const paypalSubscriptionInfo = await fetch(
      `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${paypalSubscriptionId}`,
      {
        headers: this.headers,
      },
    );

    const subscription = await paypalSubscriptionInfo.json();

    const plan = await this.productRepository.getProductByPaypalPlanId(
      subscription.plan_id,
    );

    return {
      plan,
      userId: subscription.custom_id,
      paypalSubscriptionInfo: subscription,
    };
  }

  async updateAutoRenewalStatus(
    subscription,
    autoRenewal,
    startTime: Date | null = null,
  ) {
    const paypalSubscriptionId = subscription.paypalSubscriptionId;

    const { userId, paypalSubscriptionInfo } =
      await this.getPaypalSubscriptionInfo(paypalSubscriptionId);

    await this.cancelSubscription(paypalSubscriptionId);

    const newSubscription = await this.subscribeUser(
      userId,
      paypalSubscriptionInfo.plan_id,
      autoRenewal,
      startTime,
    );

    return newSubscription.id;
  }
}
