const express = require('express');
const { adminLogin, patientLogin, registerPatient, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/admin/login', adminLogin);
router.post('/patient/login', patientLogin);
router.post('/patient/register', registerPatient);
router.get('/me', protect, getMe);

module.exports = router;
