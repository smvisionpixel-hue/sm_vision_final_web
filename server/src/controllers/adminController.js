const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide both username/email and password.'
      });
    }

    const cleanUser = username.trim().toLowerCase();
    const user = db.prepare('SELECT * FROM admin_users WHERE LOWER(username) = ? OR LOWER(email) = ?').get(cleanUser, cleanUser);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials. Please verify your login details.'
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials. Please verify your login details.'
      });
    }

    const secret = process.env.JWT_SECRET || 'sm_vision_pixel_jwt_secret_key_change_in_production_998811';
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      secret,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('[Admin Login Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred during login.'
    });
  }
}

function getMe(req, res) {
  return res.json({
    success: true,
    user: req.user
  });
}

function getInquiries(req, res) {
  try {
    const { status, type, search } = req.query;

    let query = 'SELECT * FROM inquiries WHERE 1=1';
    const params = [];

    if (status && status !== 'All') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (type && type !== 'All') {
      query += ' AND type = ?';
      params.push(type);
    }

    if (search && search.trim() !== '') {
      query += ' AND (name LIKE ? OR email LIKE ? OR phone LIKE ? OR service LIKE ? OR business_name LIKE ?)';
      const term = `%${search.trim()}%`;
      params.push(term, term, term, term, term);
    }

    query += ' ORDER BY created_at DESC';

    const inquiries = db.prepare(query).all(...params);

    // Compute stats
    const totalCount = db.prepare('SELECT COUNT(*) as count FROM inquiries').get().count;
    const newCount = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'New'").get().count;
    const contactedCount = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'Contacted'").get().count;
    const completedCount = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'Completed'").get().count;

    return res.json({
      success: true,
      stats: {
        total: totalCount,
        new: newCount,
        contacted: contactedCount,
        completed: completedCount
      },
      data: inquiries
    });
  } catch (err) {
    console.error('[Admin Inquiries Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve inquiries from database.'
    });
  }
}

function updateInquiryStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['New', 'Contacted', 'Completed'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${allowedStatuses.join(', ')}`
      });
    }

    const stmt = db.prepare(`
      UPDATE inquiries 
      SET status = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `);

    const result = stmt.run(status, id);

    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        error: 'Inquiry not found.'
      });
    }

    return res.json({
      success: true,
      message: `Inquiry status updated to ${status}.`
    });
  } catch (err) {
    console.error('[Admin Update Inquiry Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to update inquiry status.'
    });
  }
}

function deleteInquiry(req, res) {
  try {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM inquiries WHERE id = ?');
    const result = stmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        error: 'Inquiry not found.'
      });
    }

    return res.json({
      success: true,
      message: 'Inquiry deleted successfully.'
    });
  } catch (err) {
    console.error('[Admin Delete Inquiry Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete inquiry.'
    });
  }
}

module.exports = {
  login,
  getMe,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry
};
