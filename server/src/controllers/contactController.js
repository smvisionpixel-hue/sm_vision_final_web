const db = require('../config/db');
const { sendInquiryNotification } = require('../utils/email');

function handleContact(req, res) {
  try {
    const data = req.sanitizedBody;
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';

    const stmt = db.prepare(`
      INSERT INTO inquiries (type, name, email, phone, business_name, service, budget_range, message, status, ip_address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'New', ?)
    `);

    const result = stmt.run(
      'contact',
      data.name,
      data.email,
      data.phone,
      data.business_name || null,
      data.service,
      data.budget_range || null,
      data.message,
      ip
    );

    // Trigger optional email notification asynchronously (doesn't block user response)
    sendInquiryNotification({ ...data, type: 'contact' }).catch(err => {
      console.error('[Notification Error]:', err.message);
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to SM Vision Pixel! We have received your message and will respond within 24 hours.',
      inquiryId: result.lastInsertRowid
    });
  } catch (err) {
    console.error('[Contact Controller Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your message. Please try again or contact us directly at smvisionpixel@gmail.com'
    });
  }
}

function handleQuote(req, res) {
  try {
    const data = req.sanitizedBody;
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';

    const stmt = db.prepare(`
      INSERT INTO inquiries (type, name, email, phone, business_name, service, budget_range, message, status, ip_address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'New', ?)
    `);

    const result = stmt.run(
      'quote',
      data.name,
      data.email,
      data.phone,
      data.business_name || null,
      data.service,
      data.budget_range || null,
      data.message,
      ip
    );

    // Trigger optional email notification asynchronously
    sendInquiryNotification({ ...data, type: 'quote' }).catch(err => {
      console.error('[Notification Error]:', err.message);
    });

    return res.status(201).json({
      success: true,
      message: 'Your quotation request has been successfully submitted! Our creative team will prepare your custom estimate promptly.',
      inquiryId: result.lastInsertRowid
    });
  } catch (err) {
    console.error('[Quote Controller Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while submitting your quote request. Please try again.'
    });
  }
}

// Client Portal Inquiry Lookup (by email, phone, or ID)
function handleClientLookup(req, res) {
  try {
    const { identifier } = req.body;
    if (!identifier || typeof identifier !== 'string' || identifier.trim().length < 3) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your registered email address or phone number.'
      });
    }

    const cleanInput = identifier.trim().toLowerCase();
    const phoneDigits = identifier.replace(/\D/g, '');

    let query = `
      SELECT id, type, name, email, phone, business_name, service, budget_range, message, status, created_at, updated_at
      FROM inquiries
      WHERE LOWER(email) = ? OR LOWER(name) LIKE ?
    `;
    const params = [cleanInput, `%${cleanInput}%`];

    if (phoneDigits.length >= 6) {
      query += ` OR replace(replace(replace(phone, ' ', ''), '-', ''), '+', '') LIKE ?`;
      params.push(`%${phoneDigits}%`);
    }

    if (!isNaN(identifier) && parseInt(identifier, 10) > 0) {
      query += ` OR id = ?`;
      params.push(parseInt(identifier, 10));
    }

    query += ' ORDER BY created_at DESC';

    const inquiries = db.prepare(query).all(...params);

    if (!inquiries || inquiries.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No active inquiries or projects found matching that email or phone. Please verify your details or submit a new project inquiry.'
      });
    }

    return res.json({
      success: true,
      count: inquiries.length,
      data: inquiries,
      clientName: inquiries[0].name,
      clientEmail: inquiries[0].email
    });
  } catch (err) {
    console.error('[Client Lookup Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred while retrieving project status.'
    });
  }
}

module.exports = {
  handleContact,
  handleQuote,
  handleClientLookup
};
