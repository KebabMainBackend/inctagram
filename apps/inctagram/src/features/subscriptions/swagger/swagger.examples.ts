export const GetRequestProductsViewExample = {
  period: 7,
  productPriceId: 'price_1P2eelAPDz5prGS3XJgSKOcJ',
  price: 7,
  interval: 'week',
  subscriptionPriceId: 'price_1P2eelAPDz5prGS3gsTu51HQ',
};

export const GetCurrentSubscriptionExample = {
  expireAt: '2024-02-26',
  nextPayment: '2024-02-26',
  subscriptions: [
    {
      subscriptionId: 110,
      userId: 82,
      period: 365,
      interval: 'year',
      dateOfSubscribe: '2024-04-21T09:44:03.863Z',
      dateOfNextPayment: '2025-04-21T09:44:03.863Z',
      autoRenewal: false,
      paymentSystem: 'Paypal',
      productPriceId: 'price_1P3HspAPDz5prGS3y8S2ipW8',
      subscriptionPriceId: 'price_1P3HspAPDz5prGS3lGi6DKdZ',
      stripeSubscriptionId: null,
      paypalSubscriptionId: null,
      subscriptionStatus: 'Pending',
    },
  ],
};
