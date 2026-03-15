const Announcement = require('../models/Announcement');

// GET /api/announcements  (public — only active, non-expired)
exports.getActiveAnnouncements = async (req, res) => {
  const now = new Date();
  const announcements = await Announcement.find({
    isActive: true,
    $or: [{ expiresAt: { $exists: false } }, { expiresAt: null }, { expiresAt: { $gt: now } }],
  }).sort({ priority: -1, createdAt: -1 }).limit(10);

  res.json({ success: true, data: announcements });
};

// GET /api/announcements/all  (admin only)
exports.getAllAnnouncements = async (req, res) => {
  const announcements = await Announcement.find().sort({ priority: -1, createdAt: -1 });
  res.json({ success: true, data: announcements });
};

// POST /api/announcements  (admin only)
exports.createAnnouncement = async (req, res) => {
  const { title, content, type, isActive, expiresAt, link, linkText, priority } = req.body;

  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and content are required' });
  }

  const announcement = await Announcement.create({ title, content, type, isActive, expiresAt, link, linkText, priority });
  res.status(201).json({ success: true, data: announcement });
};

// PATCH /api/announcements/:id  (admin only)
exports.updateAnnouncement = async (req, res) => {
  const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!announcement) return res.status(404).json({ success: false, message: 'Announcement not found' });
  res.json({ success: true, data: announcement });
};

// DELETE /api/announcements/:id  (admin only)
exports.deleteAnnouncement = async (req, res) => {
  const announcement = await Announcement.findByIdAndDelete(req.params.id);
  if (!announcement) return res.status(404).json({ success: false, message: 'Announcement not found' });
  res.json({ success: true, message: 'Announcement deleted' });
};
