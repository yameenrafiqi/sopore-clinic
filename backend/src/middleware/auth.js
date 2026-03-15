const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware: Requires a valid JWT in the Authorization header.
 * Attaches the decoded user object to req.user.
 */
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorised — no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'User no longer exists or is inactive' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

/**
 * Middleware: Restrict access to admin-role users only.
 * Must be used AFTER `protect`.
 */
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Admin access required' });
};

/**
 * Middleware: Allow access for both patient and admin roles.
 * Must be used AFTER `protect`.
 */
const patientOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'patient')) {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Access denied' });
};

module.exports = { protect, adminOnly, patientOrAdmin };
