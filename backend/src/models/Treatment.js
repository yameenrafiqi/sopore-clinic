const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Treatment title is required'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: 300,
    },
    description: {
      type: String,
      required: [true, 'Full description is required'],
    },
    symptoms: [
      {
        type: String,
        trim: true,
      },
    ],
    causes: [
      {
        type: String,
        trim: true,
      },
    ],
    procedure: {
      type: String,
      required: [true, 'Treatment procedure description is required'],
    },
    exercises: [
      {
        name: String,
        description: String,
        sets: String,
        reps: String,
        frequency: String,
      },
    ],
    recoveryTime: {
      type: String, // e.g., "4-6 weeks"
    },
    sessions: {
      type: String, // e.g., "10-15 sessions"
    },
    category: {
      type: String,
      enum: [
        'spine',
        'orthopedic',
        'sports',
        'neurological',
        'post-surgical',
        'geriatric',
        'pediatric',
        'other',
      ],
      required: true,
    },
    icon: {
      type: String, // Emoji or icon name
      default: '🏥',
    },
    image: {
      type: String, // Cover image URL
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    metaTitle: String,
    metaDescription: String,
  },
  { timestamps: true },
);

treatmentSchema.index({ isPublished: 1, category: 1, order: 1 });
treatmentSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('Treatment', treatmentSchema);
