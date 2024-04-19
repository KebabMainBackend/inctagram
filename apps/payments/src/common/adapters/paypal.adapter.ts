import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AddNewSubscriptionTypeDto } from '../../api/dto/product.dto';
import { addMinutes } from 'date-fns';
import { CommandBus } from '@nestjs/cqrs';
import {
  notification,
  configure,
  billingPlan,
  // customer,
  billingAgreement,
} from 'paypal-rest-sdk';

@Injectable()
export class PaypalAdapter {
  constructor(
    private configService: ConfigService,
    private commandBus: CommandBus,
  ) {
    configure({
      mode: 'sandbox', // sandbox или live
      client_id: this.configService.get('PAYPAL_CLIENT_ID'),
      client_secret: this.configService.get('PAYPAL_CLIENT_SECRET'),
    });
  }

  async createProduct(payload: AddNewSubscriptionTypeDto): Promise<string> {
    try {
      const planData = {
        name: payload.productName,
        description: payload.description,
        type: 'INFINITE', // или 'FIXED'
        payment_definitions: [
          {
            name: 'Regular payment',
            type: 'REGULAR',
            frequency: payload.interval.toUpperCase(),
            frequency_interval: '1', // каждый месяц
            amount: {
              currency: payload.currency.toUpperCase(),
              value: `${payload.price}.00`,
            },
            cycles: '0', // бесконечное количество циклов
          },
        ],
        merchant_preferences: {
          setup_fee: {
            currency: payload.currency.toUpperCase(),
            value: '0.00',
          },
          return_url: this.configService.get('PAYMENT_SUCCESS_URL'),
          cancel_url: this.configService.get('PAYMENT_ERROR_URL'),
          auto_bill_amount: 'YES',
          initial_fail_amount_action: 'CONTINUE',
        },
      };
      const paypalPlanId = await new Promise<string>((resolve, reject) => {
        billingPlan.create(planData, (error, billingPlan) => {
          if (error) {
            console.error('Error creating PayPal plan:', error);
            reject(error);
          } else {
            console.log('PayPal plan created successfully:', billingPlan);
            resolve(billingPlan.id);
          }
        });
      });
      await this.activatePlan(paypalPlanId);
      return paypalPlanId;
    } catch (error) {
      console.error('Error creating PayPal plan:', error);
      throw error;
    }
  }

  async createCustomer() {
    // const customerData = {
    //   email_address: email,
    //   custom: userId,
    // };

    console.error('Error creating PayPal customer:');
    // return customer.create(customerData, (error, customer) => {
    //   if (error) {
    //   } else {
    //     console.log('PayPal customer created successfully:', customer);
    //   }
    // });
  }

  async createPayment({ newSubscription, paypalPlanId, email }): Promise<any> {
    const billingAgreementData = {
      name: newSubscription.interval,
      description: newSubscription.interval,
      start_date: addMinutes(new Date(), 5),
      plan: {
        id: paypalPlanId,
      },
      payer: {
        payment_method: 'paypal',
        payer_info: {
          email,
        },
      },
    };

    try {
      // Создание платежного соглашения в PayPal
      const session: any = await new Promise((resolve, reject) => {
        billingAgreement.create(
          billingAgreementData,
          (error, billingAgreement) => {
            if (error) {
              console.error('Error creating PayPal billing agreement:', error);
              reject(error);
            } else {
              console.log(billingAgreement);
              resolve(billingAgreement);
            }
          },
        );
      });

      const checkoutUrl = session.links.find(
        (link) => link.rel === 'approval_url',
      ).href;
      console.log(checkoutUrl);
      return { url: checkoutUrl };
    } catch (error) {
      console.error('Error creating PayPal billing agreement:', error);
      throw error;
    }
  }

  async activatePlan(paypalPlanId) {
    try {
      const planPatch = [
        {
          op: 'replace',
          path: '/',
          value: {
            state: 'ACTIVE',
          },
        },
      ];

      await new Promise<void>((resolve, reject) => {
        billingPlan.update(paypalPlanId, planPatch, (error, updatedPlan) => {
          if (error) {
            console.error('Error activating PayPal plan:', error);
            reject(error);
          } else {
            console.log('PayPal plan activated successfully:', updatedPlan);
            resolve();
          }
        });
      });
    } catch (error) {
      console.error('Error creating PayPal plan:', error);
      throw error;
    }
  }

  async createWebhook(
    url: string,
    eventTypes: notification.NotificationEventType[],
  ) {
    try {
      return new Promise((resolve, reject) => {
        notification.webhook.create(
          { url, event_types: eventTypes },
          (error, webhookResponse) => {
            if (error) {
              console.error('Error creating PayPal webhook:', error);
              reject(error);
            } else {
              resolve(webhookResponse);
            }
          },
        );
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // async getWebhooks(): Promise<any[]> {
  //   try {
  //     const webhooks = await paypal.notification.webhook.list();
  //     return webhooks;
  //   } catch (error) {
  //     console.error('Error fetching PayPal webhooks:', error);
  //     throw error;
  //   }
  // }
}
