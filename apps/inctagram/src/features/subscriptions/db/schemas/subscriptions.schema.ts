import mongoose from 'mongoose';

const Intervals = ['day', 'week', 'month', 'year']
const PaymentSystems = ['Stripe', 'PayPall'];
const Periods = [1, 7, 31, 365]
export const SubscriptionsSchema = new mongoose.Schema({
  userId: String,
  paymentSystem: { type: String, enum: PaymentSystems },

  stripeSubscriptionPriceId: { type: String, nullable: true },
  stripeProductPriceId: { type: String, nullable: true },
  payPallSubscriptionPriceId: { type: String, nullable: true },
  payPallProductPriceId: { type: String, nullable: true },

  interval: { type: String, enum: Intervals },

  dateOfSubscribe: { type: Date, default: Date.now},
  dateOfNextPayment: Date,
  expireAt: Date,

  autoRenewal: { type: Boolean, default: false},

  period: { type: Number, enum: Periods },
});

export default mongoose.model('Subscriptions', SubscriptionsSchema)