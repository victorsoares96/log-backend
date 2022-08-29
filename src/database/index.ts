import { connect } from 'mongoose';

export const connectToDatabase = () => {
  return connect(process.env.MONGO_URI as string);
};
