import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  getPaypalDefaultHeaders,
  getPaypalRequestHeaders,
  getPlanDto,
  getSubscriptionDto,
} from '../../application/dto/paypal.dto';
import { ProductRepository } from '../../db/product.repository';

@Injectable()
export class PaypalAdapter {
  public token: string;
  constructor(
    private configService: ConfigService,
    private productRepository: ProductRepository,
  ) {
    this.token = Buffer.from(
      `${this.configService.get('PAYPAL_CLIENT_ID')}:${this.configService.get(
        'PAYPAL_CLIENT_SECRET',
      )}`,
    ).toString('base64');
  }

  async createProduct(name, description) {
    const headers = getPaypalRequestHeaders('PRODUCT-18062019-001', this.token);

    const result = await fetch(
      'https://api-m.sandbox.paypal.com/v1/catalogs/products',
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: `${name}`,
          description: `${description}`,
          type: 'DIGITAL',
          category: 'DIRECT_MARKETING_SUBSCRIPTION',
        }),
      },
    );

    const product = await result.json();
    console.log(product, 'PRODUCT');

    return product;
  }

  async createPlan(product, interval, price, currency, period) {
    const headers = getPaypalRequestHeaders('PLAN-18062019-001', this.token);

    const planDto = getPlanDto(product, interval, price, currency);

    const result = await fetch(
      'https://api-m.sandbox.paypal.com/v1/billing/plans',
      {
        method: 'POST',
        headers,
        body: JSON.stringify(planDto),
      },
    );

    const plan = await result.json();
    console.log(plan, 'PLAN');

    await this.productRepository.updateProduct(period, plan.id);

    return plan;
  }

  async subscribeUser(userId, planId, autoRenewal) {
    const headers = getPaypalRequestHeaders(
      'SUBSCRIPTION-21092019-001',
      this.token,
    );

    const subscriptionDto = getSubscriptionDto(
      planId,
      userId,
      this.configService.get('PAYMENT_SUCCESS_URL'),
      this.configService.get('PAYMENT_ERROR_URL'),
      autoRenewal,
    );

    const result = await fetch(
      'https://api-m.sandbox.paypal.com/v1/billing/subscriptions',
      {
        method: 'POST',
        headers,
        body: JSON.stringify(subscriptionDto),
      },
    );

    return result.json();
  }

  async cancelSubscription(paypalSubscriptionId) {
    const headers = getPaypalDefaultHeaders(this.token);

    const result = await fetch(
      `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${paypalSubscriptionId}/cancel`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          reason: `Subscription was cancelled due to updating auto renewal status`,
        }),
      },
    );

    const cancelledSubscription = await result.json();
    console.log(cancelledSubscription);
    return cancelledSubscription;
  }

  async getPaypalSubscriptionInfo(token, paypalSubscriptionId) {
    const headers = getPaypalDefaultHeaders(token);

    const paypalSubscriptionInfo = await fetch(
      `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${paypalSubscriptionId}`,
      {
        headers,
      },
    );

    const subscription = await paypalSubscriptionInfo.json();

    const plan = await this.productRepository.getProductByPaypalPlanId(
      subscription.plan_id,
    );

    return { plan, userId: subscription.custom_id };
  }
}
