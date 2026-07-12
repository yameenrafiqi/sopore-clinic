const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');
const announcementRoutes = require('./routes/announcements');
const galleryRoutes = require('./routes/gallery');
const treatmentRoutes = require('./routes/treatments');

const app = express();

/* ── Security & performance middleware ──────────────────── */
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Stricter rate limit for booking endpoint
const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { error: 'Too many booking requests. Please try again in an hour.' },
});
app.use('/api/bookings', bookingLimiter);

/* ── CORS ───────────────────────────────────────────────── */
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'https://drmajidphysio.co.in',
  'https://www.drmajidphysio.co.in',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

/* ── Body parsing ───────────────────────────────────────── */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* ── Logging ────────────────────────────────────────────── */
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

/* ── Database connection ────────────────────────────────── */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dr-majid-clinic');
    console.log('✅ MongoDB connected');

    // Create initial admin user if none exists
    const User = require('./models/User');
    const bcrypt = require('bcryptjs');
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const hashedPwd = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@12345', 12);
      await User.create({
        username: process.env.ADMIN_USERNAME || 'admin',
        email: process.env.ADMIN_EMAIL || 'majidkirmani@gmail.com',
        password: hashedPwd,
        role: 'admin',
      });
      console.log('👤 Default admin user created');
    }
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

/* ── Routes ─────────────────────────────────────────────── */
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/treatments', treatmentRoutes);

/* ── Health check ───────────────────────────────────────── */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: "Dr. Majid's Clinic API",
    environment: process.env.NODE_ENV,
  });
});

/* ── 404 handler ────────────────────────────────────────── */
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

/* ── Global error handler ───────────────────────────────── */
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: 'Validation error', details: errors });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  if (err.code === 11000) {
    return res.status(400).json({ error: 'Duplicate entry. This record already exists.' });
  }

  res.status(500).json({
    error: process.env.NODE_ENV === 'production' ? 'Server error' : err.message,
  });
});

/* ── Start server ───────────────────────────────────────── */
const PORT = process.env.PORT || 5001;

const startServer = async () => {
  await connectDB();
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`📋 API docs: http://localhost:${PORT}/api/health`);
  });
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use. Set a different PORT in .env or free the port.`);
    } else {
      console.error('Server error:', err.message);
    }
    process.exit(1);
  });
};

startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  mongoose.connection.close().then(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

module.exports = app;
