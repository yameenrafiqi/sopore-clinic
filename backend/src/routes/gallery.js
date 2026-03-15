const express = require('express');
const { getGallery, uploadImage, updateImage, deleteImage } = require('../controllers/galleryController');
const { protect, adminOnly } = require('../middleware/auth');
const { uploadGallery } = require('../middleware/upload');

const router = express.Router();

router.get('/', getGallery);
router.post('/upload', protect, adminOnly, uploadGallery.single('image'), uploadImage);
router.patch('/:id', protect, adminOnly, updateImage);
router.delete('/:id', protect, adminOnly, deleteImage);

module.exports = router;
