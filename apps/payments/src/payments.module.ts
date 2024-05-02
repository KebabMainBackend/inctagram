import { Module } from '@nestjs/common';
import { PaymentsController } from './api/payments.controller';
import { PaymentsService } from './payments.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { StripeController } from './api/stripe.controller';
import { ProductRepository } from './db/product.repository';
import { ProductQueryRepository } from './db/product.query-repository';
import { PaymentsRepository } from './db/payments.repository';
import { SubscriptionRepository } from './db/subscription.repository';
import { CreateStripeCustomerHandler } from './application/use-cases/stripe/create-stripe-customer.command';
import { CreateStripeProductHandler } from './application/use-cases/stripe/create-stripe-product.command';
import { FinishStripePaymentHandler } from './application/use-cases/stripe/finish-stripe-payment.command';
import { GetCurrentSubscriptionInfoHandler } from './application/use-cases/get-current-subscription-info.command';
import { PurchaseSubscriptionHandler } from './application/use-cases/purchase-subscription.command';
import { UpdateAutoRenewalStatusHandler } from './application/use-cases/update-auto-renewal-status.command';
import { StripeAdapter } from './common/adapters/stripe.adapter';
import { PrismaService } from './prisma.service';
import { EmailService } from '../../inctagram/src/auth/managers/email.manager';
import { CreatePaypalProductHandler } from './application/use-cases/paypal/create-paypal-product.command';
import { PaypalAdapter } from './common/adapters/paypal.adapter';
import { PaypalController } from './api/paypal.controller';
import { FinishPaypalPaymentHandler } from './application/use-cases/paypal/finish-paypal-payment.command';
import { GetUserPaymentsHandler } from './application/use-cases/get-user-payments.command';
import { CreatePaypalWebhookHandler } from './application/use-cases/paypal/create-paypal-webhook.command';

const commandHandlers = [
  CreateStripeCustomerHandler,
  CreateStripeProductHandler,
  FinishStripePaymentHandler,
  GetCurrentSubscriptionInfoHandler,
  PurchaseSubscriptionHandler,
  UpdateAutoRenewalStatusHandler,
  CreatePaypalProductHandler,
  FinishPaypalPaymentHandler,
  GetUserPaymentsHandler,
  CreatePaypalWebhookHandler,
];

const repos = [
  PaymentsRepository,
  SubscriptionRepository,
  ProductRepository,
  ProductQueryRepository,
];

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.dev'],
    }),
  ],
  controllers: [PaymentsController, StripeController, PaypalController],
  providers: [
    StripeAdapter,
    PrismaService,
    PaymentsService,
    EmailService,
    PaypalAdapter,
    ...commandHandlers,
    ...repos,
  ],
})
export class PaymentsModule {}
