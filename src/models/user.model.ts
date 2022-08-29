import { Schema, model, Document } from 'mongoose';

export interface UserInterface extends Document {
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName(): string;
}

const UserSchema = new Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
  },
  { timestamps: true },
);

export default model<UserInterface>('User', UserSchema);
