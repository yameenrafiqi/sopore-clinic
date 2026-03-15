const Booking = require('../models/Booking');
const { sendBookingConfirmation, sendAdminNotification, sendStatusUpdate } = require('../utils/email');

// POST /api/bookings  (public)
exports.createBooking = async (req, res) => {
  const { name, phone, email, treatment, date, time, message } = req.body;

  // Basic validation
  if (!name || !phone || !treatment || !date || !time) {
    return res.status(400).json({ success: false, message: 'Name, phone, treatment, date, and time are required' });
  }

  const booking = await Booking.create({ name, phone, email, treatment, date, time, message });

  // Fire-and-forget notifications (don't block the response)
  Promise.allSettled([
    email ? sendBookingConfirmation(booking) : Promise.resolve(),
    sendAdminNotification(booking),
  ]).then((results) => {
    const [patientResult, adminResult] = results;
    if (patientResult.status === 'rejected') console.warn('Patient email failed:', patientResult.reason?.message);
    if (adminResult.status === 'rejected') console.warn('Admin email failed:', adminResult.reason?.message);
  });

  res.status(201).json({ success: true, data: booking, message: 'Appointment booked successfully' });
};

// GET /api/bookings  (admin only)
exports.getAllBookings = async (req, res) => {
  const { status, date, page = 1, limit = 20 } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (date) {
    const d = new Date(date);
    const nextDay = new Date(d);
    nextDay.setDate(nextDay.getDate() + 1);
    filter.date = { $gte: d, $lt: nextDay };
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [bookings, total] = await Promise.all([
    Booking.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
    Booking.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: bookings,
    pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / parseInt(limit)) },
  });
};

// GET /api/bookings/:id  (admin only)
exports.getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
  res.json({ success: true, data: booking });
};

// GET /api/bookings/patient/:phone  (protect + patientOrAdmin)
exports.getPatientBookings = async (req, res) => {
  const { phone } = req.params;

  // Patients may only view their own bookings
  if (req.user.role === 'patient' && req.user.phone !== phone) {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }

  const bookings = await Booking.find({ phone }).sort({ date: -1 });
  res.json({ success: true, data: bookings });
};

// PATCH /api/bookings/:id/status  (admin only)
exports.updateBookingStatus = async (req, res) => {
  const { status, notes } = req.body;
  const allowedStatuses = ['pending', 'confirmed', 'rejected', 'completed', 'cancelled'];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: `Status must be one of: ${allowedStatuses.join(', ')}` });
  }

  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status, ...(notes !== undefined && { notes }) },
    { new: true, runValidators: true },
  );

  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

  // Send status update email
  if (booking.email && ['confirmed', 'rejected', 'completed', 'cancelled'].includes(status)) {
    sendStatusUpdate(booking).catch((err) => console.warn('Status email failed:', err.message));
  }

  res.json({ success: true, data: booking, message: `Booking ${status}` });
};

// DELETE /api/bookings/:id  (admin only)
exports.deleteBooking = async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
  res.json({ success: true, message: 'Booking deleted' });
};

// GET /api/bookings/stats  (admin only)
exports.getBookingStats = async (req, res) => {
  const [statusCounts, todayCount, weekCount] = await Promise.all([
    Booking.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Booking.countDocuments({
      date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)), $lt: new Date(new Date().setHours(23, 59, 59, 999)) },
    }),
    Booking.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    }),
  ]);

  const stats = { today: todayCount, week: weekCount };
  statusCounts.forEach(({ _id, count }) => { stats[_id] = count; });

  res.json({ success: true, data: stats });
};
