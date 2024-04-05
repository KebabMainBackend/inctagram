import mongoose from 'mongoose';

const Intervals = ['day', 'week', 'month', 'year']
const Periods = [1, 7, 31, 365]

export const ProductsSchema = new mongoose.Schema({
  stripeSubscriptionPriceId: { type: String, nullable: true },
  stripeProductPriceId: { type: String, nullable: true },
  payPallSubscriptionPriceId: { type: String, nullable: true },
  payPallProductPriceId: { type: String, nullable: true },

  interval: { type: String, enum: Intervals },

  price: Number,
  period: { type: Number, enum: Periods},

});

export default mongoose.model('Payments', ProductsSchema)
