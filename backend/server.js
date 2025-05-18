const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const apiRoutes = require('./routes/api');
const registrationRoutes = require('./routes/registrationRoutes');
const registrationsRoutes = require('./routes/registrationsRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Updated CORS configuration for production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, /\.vercel\.app$/] 
    : "http://localhost:5173",
  methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', apiRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/registration', registrationsRoutes);

// Root route handler - Add this!
app.get('/', (req, res) => {
  res.status(200).send('Mahotsav API Server is running!');
});

// Catch-all route handler for API routes that don't exist
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'NOT_FOUND', 
    message: 'The requested API endpoint does not exist' 
  });
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for Vercel
module.exports = app;