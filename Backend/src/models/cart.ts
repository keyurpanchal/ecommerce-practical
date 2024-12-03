import mongoose, { Document, Schema } from 'mongoose';

interface ICartItem extends Document {
  userId: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number; 
}

const cartItemSchema: Schema = new Schema({
  userId: { type: String, required: [true, 'userId is required'] },
  productId: { type: String, required: [true, 'productId is required'] },
  productName: { type: String, required: [true, 'productName is required'] },
  quantity: { type: Number, required: [true, 'quantity is required'] },
  price: { type: Number, required: [[true, 'price is required']] },
});

export default mongoose.model<ICartItem>('CartItem', cartItemSchema);
