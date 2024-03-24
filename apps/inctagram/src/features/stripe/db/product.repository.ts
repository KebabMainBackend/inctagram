import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import Stripe from 'stripe';
import { addNewSubscriptionTypeDto } from '../api/dto';
import { ProductEntity } from '../domain/product.entity';
import * as process from 'process';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  stripeSuccess() {
    return 'Payment was successful!';
  }

  stripeCanceled() {
    return 'Transaction failed, please try again';
  }

  async makeAPurchase(priceId, quantity) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const session = await stripe.checkout.sessions.create({
      success_url: 'https://localhost:3000/stripe/success',
      cancel_url: 'https://localhost:3000/stripe/canceled',
      line_items: [
        {
          price: priceId,
          quantity,
        },
      ],
      mode: 'payment',
    });

    return session.url;
  }

  async addNewProductToStripe(payload: addNewSubscriptionTypeDto) {
    const {
      productPrice,
      currency,
      productName,
      description,
      interval,
      type,
      category,
    } = payload;

    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    stripe.products
      .create({
        name: productName,
        description,
      })
      .then((product) => {
        stripe.prices
          .create({
            unit_amount: productPrice * 100,
            currency,
            recurring: {
              interval,
            },
            product: product.id,
          })
          .then((price) => {
            const dto = {
              priceId: price.id,
              productId: product.id,
              price: productPrice,
              type,
              category,
            };

            const newProduct = ProductEntity.create(dto);

            this.prisma.stripe.create({
              data: newProduct,
            });

            return newProduct;
          });
      });
  }
}
