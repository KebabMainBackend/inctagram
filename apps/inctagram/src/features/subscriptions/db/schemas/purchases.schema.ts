import mongoose from "mongoose";

const PaymentSystems = ['Stripe', 'PayPall'];
export const PurchasesSchema = new mongoose.Schema({
  userId: String,
  paymentSystem: { type: String, enum: PaymentSystems },

  stripeSubscriptionPriceId: { type: String, nullable: true },
  stripeProductPriceId: { type: String, nullable: true },
  payPallSubscriptionPriceId: { type: String, nullable: true },
  payPallProductPriceId: { type: String, nullable: true },

  dateOfPayment: { type: Date, default: Date.now },
  endDateOfSubscription: Date,

  price: Number,
});

export default mongoose.model('Purchases', PurchasesSchema)