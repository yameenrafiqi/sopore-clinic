const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Reviewer name is required'],
      trim: true,
      maxlength: 100,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    review: {
      type: String,
      required: [true, 'Review text is required'],
      trim: true,
      maxlength: [2000, 'Review cannot exceed 2000 characters'],
    },
    treatment: {
      type: String,
      trim: true,
    },
    image: {
      type: String, // Optional photo URL (Cloudinary)
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    source: {
      type: String,
      enum: ['manual', 'google', 'website'],
      default: 'website',
    },
    googleReviewId: {
      type: String, // For deduplication with Google Reviews
      sparse: true,
      unique: true,
    },
  },
  { timestamps: true },
);

reviewSchema.index({ isPublished: 1, rating: -1, createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);
