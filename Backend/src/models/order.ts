import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
  userId: string;
  items: any[];
  status: string;
  totalAmount: string;
}

const OrderSchema: Schema = new Schema({
  userId: { type: String, required: [true, 'userId is required'] },
  items: { type: Array, required: [true, 'items is required'] },
  status: { type: String, default: 'processing' },
  totalAmount: { type: String, requires: true },
});

export default mongoose.model<IOrder>('Order', OrderSchema);
