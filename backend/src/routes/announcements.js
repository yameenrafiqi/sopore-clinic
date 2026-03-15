const express = require('express');
const {
  getActiveAnnouncements,
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require('../controllers/announcementController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', getActiveAnnouncements);           // public
router.get('/all', protect, adminOnly, getAllAnnouncements);
router.post('/', protect, adminOnly, createAnnouncement);
router.patch('/:id', protect, adminOnly, updateAnnouncement);
router.delete('/:id', protect, adminOnly, deleteAnnouncement);

module.exports = router;
