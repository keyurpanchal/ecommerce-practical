import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: [true, 'product name is required'] },
  category: { type: String, required: [true, 'category is required'] },
  price: { type: Number, required: [true, 'price is required'] },
  description: { type: String, required: [true, 'description is required'] },
  imageUrl: { type: String, required: [true, 'imageUrl is required'] }, 
});

export default mongoose.model<IProduct>('Product', ProductSchema);