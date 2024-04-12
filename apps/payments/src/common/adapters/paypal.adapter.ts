import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AddNewSubscriptionTypeDto } from "../../api/dto/product.dto";
import { addMinutes } from "date-fns";
import { CommandBus } from "@nestjs/cqrs";
import { notification } from "paypal-rest-sdk";

const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'live', // sandbox или live
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

@Injectable()
export class PaypalAdapter {
  constructor(private configService: ConfigService,
              private commandBus: CommandBus) {}

  async createProduct(payload: AddNewSubscriptionTypeDto): Promise<string> {
    try {
      console.log(3);
      const planData = {
        name: payload.productName,
        description: payload.description,
        type: 'INFINITE', // или 'FIXED'
        payment_definitions: [{
          name: 'Regular payment',
          type: 'REGULAR',
          frequency: payload.interval.toUpperCase(),
          frequency_interval: '1', // каждый месяц
          amount: {
            currency: payload.currency.toUpperCase(),
            value: `${payload.price}.00`
          },
          cycles: '0' // бесконечное количество циклов
        }],
        merchant_preferences: {
          setup_fee: {
            currency: payload.currency.toUpperCase(),
            value: '0.00'
          },
          return_url: this.configService.get('PAYMENT_SUCCESS_URL'),
          cancel_url: this.configService.get('PAYMENT_ERROR_URL'),
          auto_bill_amount: 'YES',
          initial_fail_amount_action: 'CONTINUE'
        }
      };
      console.log(2);
      const paypalPlanId = await new Promise<string>((resolve, reject) => {
        paypal.billingPlan.create(planData, (error, billingPlan) => {
          if (error) {
            console.error("Error creating PayPal plan:", error);
            reject(error);
          } else {
            console.log("PayPal plan created successfully:", billingPlan);
            resolve(billingPlan.id);
          }
        })
      });
      console.log(4);
      await this.activatePlan(paypalPlanId)
      console.log(5);
      return paypalPlanId
    }
    catch (error) {
      console.error("Error creating PayPal plan:", error);
      throw error;
    }
  }

  async createCustomer(email: string, userId: number) {
    const customerData = {
      email_address: email,
      custom: userId
    }

    return paypal.customer.create(customerData, (error, customer) => {
      if (error) {
        console.error("Error creating PayPal customer:", error);
      } else {
        console.log("PayPal customer created successfully:", customer);
      }
    });
  }

  async createPayment({ newSubscription,
                        paypalPlanId,
                        email
                      }): Promise<any> {

    const paypal = require('paypal-rest-sdk');

    paypal.configure({
      'mode': 'live', // sandbox или live
      'client_id': process.env.PAYPAL_CLIENT_ID,
      'client_secret': process.env.PAYPAL_CLIENT_SECRET
    });

    const billingAgreementData = {
      name: newSubscription.interval,
      description: newSubscription.interval,
      start_date: addMinutes(new Date(), 5),
      plan: {
        id: paypalPlanId
      },
      payer: {
        payment_method: 'paypal',
        payer_info: {
          email
        }
      },
    }

    try {
      // Создание платежного соглашения в PayPal
      const session  = await new Promise((resolve, reject) => {
        paypal.billingAgreement.create(billingAgreementData, (error, billingAgreement) => {
          if (error) {
            console.error("Error creating PayPal billing agreement:", error);
            reject(error);


          } else {
            console.log(billingAgreement);
            resolve(billingAgreement);
          }
        });
      });

      // @ts-ignore
      const checkoutUrl = session.links.find(link => link.rel === 'approval_url').href;

      return { url: checkoutUrl }

    } catch (error) {
      console.error("Error creating PayPal billing agreement:", error);
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
            state: 'ACTIVE'
          }
        }
      ];

      await new Promise<void>((resolve, reject) => {
        paypal.billingPlan.update(paypalPlanId, planPatch, (error, updatedPlan) => {
          if (error) {
            console.error("Error activating PayPal plan:", error);
            reject(error);
          } else {
            console.log("PayPal plan activated successfully:", updatedPlan);
            resolve();
          }
        });
      })
    } catch (error) {
      console.error("Error creating PayPal plan:", error);
      throw error;
    }
  }

  async createWebhook(url: string, eventTypes: notification.NotificationEventType[]) {
    try {
      console.log(2);
      console.log(url);
      return new Promise((resolve, reject) => {
        paypal.notification.webhook.create({url, event_types: eventTypes}, (error, webhookResponse) => {
          if (error) {
            console.log(webhookResponse);
            console.error("Error creating PayPal webhook:", error);
            reject(error);
          } else {
            console.log(webhookResponse);
            resolve(webhookResponse);
          }
        });
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getWebhooks(): Promise<any[]> {
    try {
      const webhooks = await paypal.notification.webhook.list();
      return webhooks;
    } catch (error) {
      console.error("Error fetching PayPal webhooks:", error);
      throw error;
    }
  }
}