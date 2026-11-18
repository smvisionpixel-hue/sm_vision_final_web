const express = require('express');
const router = express.Router();
const { handleContact, handleQuote, handleClientLookup } = require('../controllers/contactController');
const { validateInquiry } = require('../middleware/validate');
const { rateLimiter } = require('../middleware/rateLimiter');

// Rate limit: 20 form submissions per 15 minutes per IP
const formLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many requests from this network. Please wait a few minutes before submitting another inquiry.'
});

// POST /api/contact - Submit general contact message
router.post('/contact', formLimiter, validateInquiry, handleContact);

// POST /api/quote - Submit quotation request
router.post('/quote', formLimiter, validateInquiry, handleQuote);

// POST /api/client/lookup - Client Portal Project / Inquiry Lookup
router.post('/client/lookup', formLimiter, handleClientLookup);

module.exports = router;
