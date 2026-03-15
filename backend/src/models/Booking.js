const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[+]?[\d\s\-()]{10,15}$/, 'Invalid phone number format'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    treatment: {
      type: String,
      required: [true, 'Treatment type is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Preferred date is required'],
    },
    time: {
      type: String,
      required: [true, 'Preferred time is required'],
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected', 'completed', 'cancelled'],
      default: 'pending',
    },
    notes: {
      type: String, // Admin-only internal notes
      trim: true,
    },
    notificationSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Index for efficient queries
bookingSchema.index({ status: 1, createdAt: -1 });
bookingSchema.index({ date: 1 });
bookingSchema.index({ phone: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
