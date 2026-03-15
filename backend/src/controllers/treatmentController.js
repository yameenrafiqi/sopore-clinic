const Treatment = require('../models/Treatment');

const slugify = (text) =>
  text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

// GET /api/treatments  (public)
exports.getAllTreatments = async (req, res) => {
  const { category, featured } = req.query;

  const filter = { isPublished: true };
  if (category) filter.category = category;
  if (featured === 'true') filter.isFeatured = true;

  const treatments = await Treatment.find(filter)
    .select('-exercises -procedure -causes') // Lightweight for listing
    .sort({ order: 1, title: 1 });

  res.json({ success: true, data: treatments });
};

// GET /api/treatments/:slug  (public)
exports.getTreatmentBySlug = async (req, res) => {
  const treatment = await Treatment.findOne({ slug: req.params.slug, isPublished: true });
  if (!treatment) return res.status(404).json({ success: false, message: 'Treatment not found' });
  res.json({ success: true, data: treatment });
};

// POST /api/treatments  (admin only)
exports.createTreatment = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ success: false, message: 'Treatment title is required' });

  const slug = req.body.slug || slugify(title);
  const treatment = await Treatment.create({ ...req.body, slug });
  res.status(201).json({ success: true, data: treatment });
};

// PATCH /api/treatments/:id  (admin only)
exports.updateTreatment = async (req, res) => {
  if (req.body.title && !req.body.slug) req.body.slug = slugify(req.body.title);

  const treatment = await Treatment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!treatment) return res.status(404).json({ success: false, message: 'Treatment not found' });
  res.json({ success: true, data: treatment });
};

// DELETE /api/treatments/:id  (admin only)
exports.deleteTreatment = async (req, res) => {
  const treatment = await Treatment.findByIdAndDelete(req.params.id);
  if (!treatment) return res.status(404).json({ success: false, message: 'Treatment not found' });
  res.json({ success: true, message: 'Treatment deleted' });
};
