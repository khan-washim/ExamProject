import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Database Connection
const MONGO_URI = 'mongodb+srv://washimuddin760:wa1234@cluster0.1czcs.mongodb.net/exam';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database connection error:', err));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);

// Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
