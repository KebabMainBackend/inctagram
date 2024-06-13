import Stripe from 'stripe';
import { Injectable } from '@nestjs/common';
import { AddNewSubscriptionTypeDto } from '../../api/dto/product.dto';
import { ConfigService } from '@nestjs/config';
import { ProductEntity } from '../../db/domain/product.entity';

type StripeCheckoutData = {
  productInfo: ProductEntity;
  userId: number;
};

@Injectable()
export class StripeAdapter {
  constructor(private configService: ConfigService) {}

  async createPayment({
    userId,
    productInfo,
  }: StripeCheckoutData): Promise<any> {
    const stripe = new Stripe(this.configService.get('STRIPE_API_KEY'));
    console.log(this.configService.get('PAYMENT_SUCCESS_URL'));
    return await stripe.checkout.sessions.create({
      success_url: this.configService.get('PAYMENT_SUCCESS_URL'),
      cancel_url: this.configService.get('PAYMENT_ERROR_URL'),
      line_items: [
        {
          price: productInfo.productPriceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        userId: String(userId),
        productInfo: JSON.stringify(productInfo),
      },
    });
  }

  async createCustomer(email: string, userId: number) {
    const stripe = new Stripe(this.configService.get('STRIPE_API_KEY'));

    return stripe.customers.create({
      email,
      metadata: {
        userId,
      },
    });
  }
  async createProduct(payload: AddNewSubscriptionTypeDto) {
    const stripe = new Stripe(this.configService.get('STRIPE_API_KEY'));
    const product = await stripe.products.create({
      name: payload.productName,
      description: payload.description,
    });

    //2
    const subscriptionPrice = await stripe.prices.create({
      unit_amount: payload.price * 100,
      currency: payload.currency,
      recurring: {
        interval: payload.interval,
      },
      product: product.id,
    });
    //2
    const productPrice = await stripe.prices.create({
      unit_amount: payload.price * 100,
      currency: payload.currency,
      product: product.id,
    });
    return { subscriptionPrice, productPrice };
  }

  async checkPayment(payload: { rawBody: any; signature: string }) {
    const stripe = new Stripe(this.configService.get('STRIPE_API_KEY'));
    const event = stripe.webhooks.constructEvent(
      Buffer.from(payload.rawBody),
      payload.signature,
      this.configService.get('STRIPE_WEBHOOK_SECRET_S'),
    );
    if (event.type === 'checkout.session.completed') {
      const data = event.data.object as Stripe.Checkout.Session;
      const dataPayment = {
        paymentsId: data.client_reference_id,
        price: data.amount_total,
      };

      return { data, dataPayment };
    }
    return null;
  }

  async updateAutoRenewalStatus(
    dbSubscription,
    autoRenewal: boolean,
    customer,
  ) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    if (autoRenewal && !dbSubscription.stripeSubscriptionId) {
      const subscription = await stripe.subscriptions.create({
        customer: customer.stripeCustomerId,

        cancel_at_period_end: !autoRenewal,
        items: [{ price: dbSubscription.subscriptionPriceId }],
        trial_end: Math.floor(
          dbSubscription.dateOfNextPayment.getTime() / 1000,
        ),
      });

      return subscription.id;
    } else {
      await stripe.subscriptions.update(dbSubscription.stripeSubscriptionId, {
        cancel_at_period_end: !autoRenewal,
        metadata: { key: process.env.STRIPE_API_KEY },
      });

      return null;
    }
  }
}
