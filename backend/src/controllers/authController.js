const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const signToken = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
});

// POST /api/auth/admin/login
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  const user = await User.findOne({ username, role: 'admin' }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  const token = signToken(user._id, user.role);
  res.json({
    success: true,
    token,
    user: { id: user._id, username: user.username, role: user.role, email: user.email },
  });
};

// POST /api/auth/patient/login
exports.patientLogin = async (req, res) => {
  const { phone, email } = req.body;

  if (!phone && !email) {
    return res.status(400).json({ success: false, message: 'Phone number or email is required' });
  }

  const query = phone ? { phone, role: 'patient' } : { email, role: 'patient' };
  const user = await User.findOne(query);

  if (!user) {
    return res.status(404).json({ success: false, message: 'No patient account found with these details' });
  }

  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  const token = signToken(user._id, user.role);
  res.json({
    success: true,
    token,
    user: { id: user._id, firstName: user.firstName, lastName: user.lastName, phone: user.phone, email: user.email, role: user.role },
  });
};

// POST /api/auth/patient/register
exports.registerPatient = async (req, res) => {
  const { firstName, lastName, phone, email } = req.body;

  if (!firstName || !phone) {
    return res.status(400).json({ success: false, message: 'First name and phone number are required' });
  }

  const existing = await User.findOne({ phone, role: 'patient' });
  if (existing) {
    return res.status(409).json({ success: false, message: 'A patient account already exists with this phone number' });
  }

  const user = await User.create({ firstName, lastName, phone, email, role: 'patient' });
  const token = signToken(user._id, user.role);

  res.status(201).json({
    success: true,
    token,
    user: { id: user._id, firstName: user.firstName, lastName: user.lastName, phone: user.phone, email: user.email, role: user.role },
  });
};

// GET /api/auth/me  (protected)
exports.getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};
