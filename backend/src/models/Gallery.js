const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    publicId: {
      type: String, // Cloudinary public ID for deletion
      required: [true, 'Cloudinary public ID is required'],
    },
    thumbnailUrl: {
      type: String, // Auto-generated thumbnail from Cloudinary
    },
    alt: {
      type: String,
      required: [true, 'Image alt text is required for accessibility'],
      trim: true,
      maxlength: 200,
    },
    category: {
      type: String,
      enum: ['clinic', 'equipment', 'treatment', 'team', 'recovery', 'events'],
      default: 'clinic',
    },
    caption: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0, // For manual ordering
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    width: Number,
    height: Number,
  },
  { timestamps: true },
);

gallerySchema.index({ isPublished: 1, category: 1, order: 1 });
gallerySchema.index({ isFeatured: 1 });

module.exports = mongoose.model('Gallery', gallerySchema);
