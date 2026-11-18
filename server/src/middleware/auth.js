const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required. Missing or malformed token.'
    });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'sm_vision_pixel_jwt_secret_key_change_in_production_998811';

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired session. Please log in again.'
    });
  }
}

module.exports = { requireAuth };
