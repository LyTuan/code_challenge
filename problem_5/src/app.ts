import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import resourceRoutes from './routes/resource.routes';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/resources', resourceRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

export default app;
