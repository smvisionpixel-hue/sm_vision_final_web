const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/contactRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Trust proxy for rate limiting behind reverse proxies/Vercel/Render
app.set('trust proxy', 1);

// CORS configuration - allow configured frontend URL or default local Vite dev ports
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error('CORS policy does not allow access from the specified origin.'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Health Check Endpoint (Required by spec)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    agency: 'SM Vision Pixel',
    positioning: 'Creative Media & Branding Studio',
    tagline: 'Creative Ideas. Stronger Brands.',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: 'SQLite (Active)'
  });
});

// Mount Routes
app.use('/api', contactRoutes);
app.use('/api', serviceRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `API route ${req.originalUrl} not found.`
  });
});

// Serve frontend production build if available
const path = require('path');
const fs = require('fs');
const clientDist = path.join(__dirname, '../../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error. Please try again later.'
  });
});

module.exports = app;
