import { addMinutes } from 'date-fns';
import { rethrow } from '@nestjs/core/helpers/rethrow';

export const getPlanDto = (product, interval, price, currency) => {
  return {
    product_id: `${product.id}`,
    name: `${product.name}`,
    description: `${product.description}`,
    status: 'ACTIVE',
    billing_cycles: [
      {
        frequency: {
          interval_unit: `${interval.toUpperCase()}`,
          interval_count: 1,
        },
        tenure_type: 'REGULAR',
        sequence: 1,
        total_cycles: 0,
        pricing_scheme: {
          fixed_price: {
            value: `${price}`,
            currency_code: `${currency.toUpperCase()}`,
          },
        },
      },
    ],
    payment_preferences: {
      auto_bill_outstanding: true,
      setup_fee_failure_action: 'CONTINUE',
      payment_failure_threshold: 3,
    },
  };
};

export const getPaypalRequestHeaders = (paypalReqId, token) => {
  return {
    'X-PAYPAL-SECURITY-CONTEXT':
      '{' +
      '"apiCaller":{' +
      '"clientId":"AdtlNBDhgmQWi2xk6edqJVKklPFyDWxtyKuXuyVT-OgdnnKpAVsbKHgvqHHP",' +
      '"scopes":[' +
      '"https://api-m.paypal.com/v1/subscription/.*",' +
      '"https://uri.paypal.com/services/subscription",' +
      '"openid"' +
      ']}',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'PayPal-Request-Id': `${paypalReqId}`,
    Prefer: 'return=representation',
    Authorization: `Basic ${token}`,
  };
};

export const getPaypalDefaultHeaders = (token) => {
  return {
    'X-PAYPAL-SECURITY-CONTEXT':
      '{' +
      '"apiCaller":{' +
      '"clientId":"AdtlNBDhgmQWi2xk6edqJVKklPFyDWxtyKuXuyVT-OgdnnKpAVsbKHgvqHHP",' +
      '"scopes":[' +
      '"https://api-m.paypal.com/v1/subscription/.*",' +
      '"https://uri.paypal.com/services/subscription",' +
      '"openid"' +
      ']}',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Basic ${token}`,
  };
};

export const getSubscriptionDto = (
  planId,
  userId,
  return_url,
  cancel_url,
  autoRenewal,
) => {
  return {
    plan_id: `${planId}`,
    start_time: `${addMinutes(new Date(), 10).toISOString()}`,
    auto_renewal: `${autoRenewal}`,
    custom_id: `${userId}`,
    application_context: {
      brand_name: 'inctagram',
      locale: 'en-US',
      user_action: 'SUBSCRIBE_NOW',
      payment_method: {
        payer_selected: 'PAYPAL',
        payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED',
      },
      return_url: `${return_url}`,
      cancel_url: `${cancel_url}`,
    },
  };
};
