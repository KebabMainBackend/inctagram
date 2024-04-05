import { Connection } from 'mongoose';
import { FileImageSchema } from '../db/schemas/products.schema';

export const paymentProviders = [
  {
    provide: 'SUBSCRIPTION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('subscriptions', FileImageSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
