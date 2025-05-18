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
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://mahotsav.vercel.app',
      'http://localhost:5173'
    ];
    if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use((req, res, next) => {
  console.log(`Route being processed: ${req.path}`);
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', apiRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/registration', registrationsRoutes);

// Root route handler - Add this!
app.get('/', (req, res) => {
  res.status(200).send('Mahotsav API Server is running!');
});


const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for Vercel
module.exports = app;
