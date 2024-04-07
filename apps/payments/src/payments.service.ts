import { Injectable } from '@nestjs/common';
import process from 'process';
import Stripe from 'stripe';
import { CommandBus } from '@nestjs/cqrs';
@Injectable()
export class PaymentsService {
  constructor(private commandBus: CommandBus) {}

  async stripeCheckout(payload, productInfo, userId) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:3000/api/v1/stripe/success',
      cancel_url: 'http://localhost:3000/api/v1/stripe/canceled',
      line_items: [
        {
          price: productInfo.productPriceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        userId: String(userId),
        payload: JSON.stringify(payload),
        productInfo: JSON.stringify(productInfo),
      },
    });

    return session;
  }

  // async addNewProductToStripe(payload: addNewSubscriptionTypeDto) {
  //   const stripe = new Stripe(process.env.STRIPE_API_KEY);
  //
  //   const product = await stripe.products.create({
  //     name: payload.productName,
  //     description: payload.description,
  //   });
  //
  //   const defaultPriceDto = {
  //     unit_amount: payload.price * 100,
  //     currency: payload.currency,
  //     product: product.id,
  //   };
  //
  //   const subscriptionPrice = await stripe.prices.create({
  //     ...defaultPriceDto,
  //     recurring: {
  //       interval: payload.interval,
  //     },
  //   });
  //
  //   const productPrice = await stripe.prices.create({ ...defaultPriceDto });
  //
  //   const newProduct = ProductEntity.create(
  //     productPrice.id,
  //     subscriptionPrice.id,
  //     payload.price,
  //     payload.period,
  //     payload.interval,
  //   );
  //
  //   await this.prisma.stripe.create({ data: newProduct });
  // }

  // async updateAutoRenewalStatus(product, autoRenewal, userId) {
  //   const stripe = new Stripe(process.env.STRIPE_API_KEY);
  //
  //   if (!product) return;
  //   // if(!dbSubscription.autoRenewal && !autoRenewal) return
  //
  //   const customer = await customerCreate(
  //     userId,
  //     product.profile.user.email,
  //     this.prisma,
  //     stripe,
  //   );
  //
  //   if (autoRenewal) {
  //     const subscription = await stripe.subscriptions.create({
  //       customer: customer.customerId,
  //       cancel_at_period_end: !autoRenewal,
  //       items: [{ price: product.subscriptionPriceId }],
  //       trial_end: Math.floor(product.dateOfNextPayment.getTime() / 1000),
  //     });
  //
  //     await this.prisma.subscription.update({
  //       where: { userId, subscriptionId: product.subscriptionId },
  //       data: { stripeSubscriptionId: subscription.id, autoRenewal },
  //     });
  //   } else {
  //     await stripe.subscriptions.update(product.stripeSubscriptionId, {
  //       cancel_at_period_end: !autoRenewal,
  //       metadata: { key: process.env.STRIPE_API_KEY },
  //     });
  //
  //     //1
  //     await this.prisma.subscription.update({
  //       where: { userId, subscriptionId: product.subscriptionId },
  //       data: { stripeSubscriptionId: null, autoRenewal },
  //     });
  //     //1
  //   }
  //
  //   const autoRenewalOnSubscriptions = await this.prisma.subscription.findMany({
  //     where: { userId, autoRenewal: true },
  //     orderBy: [{ dateOfNextPayment: 'asc' }],
  //   });
  //
  //   if (autoRenewalOnSubscriptions.length) {
  //     await this.prisma.currentSubscription.update({
  //       where: { userId },
  //       data: { hasAutoRenewal: autoRenewal },
  //     });
  //   }
  // }
  //
  // async getProductInfo(productPriceId) {
  //   return await this.prisma.stripe.findUnique({ where: { productPriceId } });
  // }
}
