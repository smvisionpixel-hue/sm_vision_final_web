/**
 * In-memory sliding rate limiter for spam prevention
 */

const ipHits = new Map();

// Periodic cleanup of expired IP tracking records every 10 minutes
const cleanupInterval = setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipHits.entries()) {
    if (now - data.firstRequestTime > 15 * 60 * 1000) {
      ipHits.delete(ip);
    }
  }
}, 10 * 60 * 1000);
cleanupInterval.unref();

function rateLimiter(options = {}) {
  const windowMs = options.windowMs || parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000; // 15 mins
  const max = options.max || parseInt(process.env.RATE_LIMIT_MAX, 10) || 30; // 30 requests per window
  const message = options.message || 'Too many submissions from this IP address. Please try again after 15 minutes.';

  return (req, res, next) => {
    // Get client IP address
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    let record = ipHits.get(ip);
    if (!record) {
      record = { count: 1, firstRequestTime: now };
      ipHits.set(ip, record);
      return next();
    }

    // If window expired, reset counter
    if (now - record.firstRequestTime > windowMs) {
      record.count = 1;
      record.firstRequestTime = now;
      return next();
    }

    record.count++;
    if (record.count > max) {
      return res.status(429).json({
        success: false,
        error: message,
        retryAfterMs: windowMs - (now - record.firstRequestTime)
      });
    }

    next();
  };
}

module.exports = { rateLimiter };
