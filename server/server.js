const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config(); // Fallback to root .env if present

const app = require('./src/app');

// Ensure database is initialized on startup
require('./scripts/init-db');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`  🌟 SM VISION PIXEL - BACKEND API SERVER RUNNING  `);
  console.log(`  Port:      http://localhost:${PORT}             `);
  console.log(`  Health:    http://localhost:${PORT}/api/health  `);
  console.log(`  Services:  http://localhost:${PORT}/api/services`);
  console.log(`  Admin API: http://localhost:${PORT}/api/admin/me`);
  console.log(`====================================================`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down SM Vision Pixel API server gracefully...');
  server.close(() => {
    console.log('Server terminated.');
    process.exit(0);
  });
});
