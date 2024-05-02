export const GetRequestProductsViewExample = {
  period: 7,
  productPriceId: 'price_1P2eelAPDz5prGS3XJgSKOcJ',
  price: 7,
  interval: 'week',
  subscriptionPriceId: 'price_1P2eelAPDz5prGS3gsTu51HQ',
};

export const GetRequestCurrentSubscriptionViewExample = {
  subscription: {
    subscriptionId: 262,
    userId: 111,
    period: 365,
    interval: 'year',
    dateOfSubscribe: '2024-05-01T09:24:12.115Z',
    dateOfNextPayment: '2025-05-01T09:24:12.115Z',
    autoRenewal: false,
    paymentSystem: 'Stripe',
    productPriceId: 'price_1P3HspAPDz5prGS3y8S2ipW8',
    subscriptionPriceId: 'price_1P3HspAPDz5prGS3lGi6DKdZ',
    stripeSubscriptionId: null,
    paypalSubscriptionId: null,
    subscriptionStatus: 'Confirmed',
  },
  expireAt: '2034-08-31T09:52:51.422Z',
};

export const GetRequestPaymentsViewExample = {
  id: 204,
  userId: 111,
  dateOfPayments: '2024-05-01T09:32:54.612Z',
  endDateOfSubscription: '2024-05-02T09:32:41.941Z',
  price: 1,
  subscriptionType: 'day',
  paymentType: 'Stripe',
};
