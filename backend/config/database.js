import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kitaabghar';

    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    });
    console.log('✅ MongoDB connected successfully');
    isConnected = true;
  } catch (error) {
    console.error('⚠️  MongoDB connection warning:', error.message);
    console.log('📌 Running in DEMO MODE with sample data');
    console.log('📌 To use real database, set MONGODB_URI in .env');
    isConnected = false;
  }
};

export const isMongoConnected = () => isConnected;

export default connectDB;

