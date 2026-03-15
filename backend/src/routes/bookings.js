const express = require('express');
const {
  createBooking,
  getAllBookings,
  getBookingById,
  getPatientBookings,
  updateBookingStatus,
  deleteBooking,
  getBookingStats,
} = require('../controllers/bookingController');
const { protect, adminOnly, patientOrAdmin } = require('../middleware/auth');

const router = express.Router();

// Public
router.post('/', createBooking);

// Admin only
router.get('/', protect, adminOnly, getAllBookings);
router.get('/stats', protect, adminOnly, getBookingStats);
router.get('/:id', protect, adminOnly, getBookingById);
router.patch('/:id/status', protect, adminOnly, updateBookingStatus);
router.delete('/:id', protect, adminOnly, deleteBooking);

// Patient or Admin
router.get('/patient/:phone', protect, patientOrAdmin, getPatientBookings);

module.exports = router;
