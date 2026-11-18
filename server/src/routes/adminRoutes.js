const express = require('express');
const router = express.Router();
const {
  login,
  getMe,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry
} = require('../controllers/adminController');
const { requireAuth } = require('../middleware/auth');
const { rateLimiter } = require('../middleware/rateLimiter');

// Rate limit: 10 login attempts per 15 minutes per IP to block brute-force attacks
const loginLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts. Please wait 15 minutes before trying again.'
});

// Public admin routes
router.post('/login', loginLimiter, login);

// Protected admin routes
router.get('/me', requireAuth, getMe);
router.get('/inquiries', requireAuth, getInquiries);
router.patch('/inquiries/:id/status', requireAuth, updateInquiryStatus);
router.delete('/inquiries/:id', requireAuth, deleteInquiry);

module.exports = router;
