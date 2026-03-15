const Review = require('../models/Review');

// GET /api/reviews  (public)
exports.getAllReviews = async (req, res) => {
  const { page = 1, limit = 12, minRating } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const filter = { isPublished: true };
  if (minRating) filter.rating = { $gte: parseInt(minRating) };

  const [reviews, total] = await Promise.all([
    Review.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
    Review.countDocuments(filter),
  ]);

  // Compute aggregate stats
  const stats = await Review.aggregate([
    { $match: { isPublished: true } },
    { $group: { _id: null, avgRating: { $avg: '$rating' }, totalReviews: { $sum: 1 } } },
  ]);

  res.json({
    success: true,
    data: reviews,
    stats: stats[0] ? { avgRating: Math.round(stats[0].avgRating * 10) / 10, totalReviews: stats[0].totalReviews } : { avgRating: 0, totalReviews: 0 },
    pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / parseInt(limit)) },
  });
};

// POST /api/reviews  (public — submitted by patients)
exports.createReview = async (req, res) => {
  const { name, rating, review, treatment } = req.body;

  if (!name || !rating || !review) {
    return res.status(400).json({ success: false, message: 'Name, rating, and review text are required' });
  }

  const created = await Review.create({ name, rating, review, treatment });
  res.status(201).json({ success: true, data: created, message: 'Thank you for your review!' });
};

// PATCH /api/reviews/:id  (admin only)
exports.updateReview = async (req, res) => {
  const { isPublished, isVerified } = req.body;
  const updated = await Review.findByIdAndUpdate(
    req.params.id,
    { ...(isPublished !== undefined && { isPublished }), ...(isVerified !== undefined && { isVerified }) },
    { new: true },
  );
  if (!updated) return res.status(404).json({ success: false, message: 'Review not found' });
  res.json({ success: true, data: updated });
};

// DELETE /api/reviews/:id  (admin only)
exports.deleteReview = async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
  res.json({ success: true, message: 'Review deleted' });
};
