/**
 * Input sanitization and validation for inquiries
 */

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, ''); // Basic XSS mitigation
}

function validateInquiry(req, res, next) {
  const { name, email, phone, service, message, honeypot, _gotcha } = req.body;

  // Honeypot spam check - if hidden bot field is filled, reject silently or return 200 dummy response
  if (honeypot || _gotcha) {
    console.warn('[Spam Protection] Bot honeypot triggered by submission');
    return res.status(200).json({
      success: true,
      message: 'Inquiry received successfully!'
    });
  }

  const errors = [];

  // Name validation
  const cleanName = sanitize(name);
  if (!cleanName || cleanName.length < 2) {
    errors.push('Full name is required (minimum 2 characters).');
  } else if (cleanName.length > 100) {
    errors.push('Full name must be under 100 characters.');
  }

  // Email validation
  const cleanEmail = sanitize(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    errors.push('A valid email address is required.');
  }

  // Phone validation
  const cleanPhone = sanitize(phone);
  const phoneDigitsOnly = cleanPhone.replace(/\D/g, '');
  if (!cleanPhone || phoneDigitsOnly.length < 7 || phoneDigitsOnly.length > 15) {
    errors.push('A valid contact phone number is required (7 to 15 digits).');
  }

  // Service validation
  const cleanService = sanitize(service);
  if (!cleanService) {
    errors.push('Please select a service.');
  }

  // Message validation
  const cleanMessage = sanitize(message);
  if (!cleanMessage || cleanMessage.length < 5) {
    errors.push('Project description/message is required (minimum 5 characters).');
  } else if (cleanMessage.length > 3000) {
    errors.push('Message is too long (maximum 3000 characters).');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  // Attach sanitized data to request
  req.sanitizedBody = {
    name: cleanName,
    email: cleanEmail.toLowerCase(),
    phone: cleanPhone,
    business_name: sanitize(req.body.business_name || ''),
    service: cleanService,
    budget_range: sanitize(req.body.budget_range || ''),
    message: cleanMessage
  };

  next();
}

module.exports = { validateInquiry };
