import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: [true, 'email is required'] },
  password: { type: String, required: [true, 'password is required'] },
  role: { type: String, default: 'user' },
});

export default mongoose.model<IUser>('User', UserSchema);