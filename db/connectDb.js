import mongoose from 'mongoose'

const connectDB = async () => {
  const URI = process.env.MONGODB_URI;
  try {
    const conn = await mongoose.connect(URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

export default connectDB;