import mongoose from 'mongoose';
mongoose.set('strictQuery', true);
const connectDB = async () => mongoose.connect(process.env.MONGODB_URI, { 
  useUnifiedTopology: true, 
  useNewUrlParser: true
});
export default connectDB;