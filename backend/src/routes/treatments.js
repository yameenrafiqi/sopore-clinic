const express = require('express');
const {
  getAllTreatments,
  getTreatmentBySlug,
  createTreatment,
  updateTreatment,
  deleteTreatment,
} = require('../controllers/treatmentController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllTreatments);
router.get('/:slug', getTreatmentBySlug);
router.post('/', protect, adminOnly, createTreatment);
router.patch('/:id', protect, adminOnly, updateTreatment);
router.delete('/:id', protect, adminOnly, deleteTreatment);

module.exports = router;
