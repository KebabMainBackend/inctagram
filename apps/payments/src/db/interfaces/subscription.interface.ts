import { ObjectId } from 'mongoose';

export interface SubscriptionInterface extends Document {
  id: ObjectId;
  userId: number;
  createdAt: string;
  updatedAt: string;
}
