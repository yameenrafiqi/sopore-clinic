const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Announcement title is required'],
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: [true, 'Announcement content is required'],
      trim: true,
      maxlength: 1000,
    },
    type: {
      type: String,
      enum: ['info', 'warning', 'success', 'promotion'],
      default: 'info',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date, // null means no expiry
    },
    link: {
      type: String, // Optional CTA link
    },
    linkText: {
      type: String, // Label for CTA link
    },
    priority: {
      type: Number,
      default: 0, // Higher = shown first
    },
  },
  { timestamps: true },
);

// Only return active, non-expired announcements when isActive is queried
announcementSchema.index({ isActive: 1, priority: -1, createdAt: -1 });

module.exports = mongoose.model('Announcement', announcementSchema);
