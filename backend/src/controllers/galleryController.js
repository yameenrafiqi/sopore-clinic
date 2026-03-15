const Gallery = require('../models/Gallery');
const { cloudinary } = require('../middleware/upload');

// GET /api/gallery  (public)
exports.getGallery = async (req, res) => {
  const { category, featured, page = 1, limit = 24 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const filter = { isPublished: true };
  if (category && category !== 'all') filter.category = category;
  if (featured === 'true') filter.isFeatured = true;

  const [images, total] = await Promise.all([
    Gallery.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(parseInt(limit)),
    Gallery.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: images,
    pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / parseInt(limit)) },
  });
};

// POST /api/gallery/upload  (admin only – uses multer middleware)
exports.uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file provided' });
  }

  const { alt, category, caption, isFeatured, order } = req.body;

  if (!alt) {
    // Clean up if alt is missing
    await cloudinary.uploader.destroy(req.file.filename).catch(() => {});
    return res.status(400).json({ success: false, message: 'Alt text is required for accessibility' });
  }

  const image = await Gallery.create({
    imageUrl: req.file.path,
    publicId: req.file.filename,
    thumbnailUrl: req.file.path.replace('/upload/', '/upload/w_400,h_300,c_fill/'),
    alt,
    category: category || 'clinic',
    caption,
    isFeatured: isFeatured === 'true',
    order: order ? parseInt(order) : 0,
    width: req.file.width,
    height: req.file.height,
  });

  res.status(201).json({ success: true, data: image });
};

// PATCH /api/gallery/:id  (admin only)
exports.updateImage = async (req, res) => {
  const { alt, category, caption, isPublished, isFeatured, order } = req.body;
  const image = await Gallery.findByIdAndUpdate(
    req.params.id,
    { alt, category, caption, isPublished, isFeatured, order },
    { new: true, runValidators: true },
  );
  if (!image) return res.status(404).json({ success: false, message: 'Image not found' });
  res.json({ success: true, data: image });
};

// DELETE /api/gallery/:id  (admin only)
exports.deleteImage = async (req, res) => {
  const image = await Gallery.findById(req.params.id);
  if (!image) return res.status(404).json({ success: false, message: 'Image not found' });

  // Remove from Cloudinary
  await cloudinary.uploader.destroy(image.publicId).catch((err) => {
    console.warn('Cloudinary deletion failed:', err.message);
  });

  await image.deleteOne();
  res.json({ success: true, message: 'Image deleted' });
};
