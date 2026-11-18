const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

// Ensure data folder exists
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'smvision.db');
const db = new DatabaseSync(dbPath);

// Enable WAL mode & foreign keys for performance and data safety
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
`);

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL DEFAULT 'contact', -- 'contact' | 'quote'
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      business_name TEXT,
      service TEXT NOT NULL,
      budget_range TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'New', -- 'New' | 'Contacted' | 'Completed'
      ip_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      category TEXT NOT NULL,
      price_label TEXT NOT NULL,
      description TEXT NOT NULL,
      icon_name TEXT NOT NULL,
      featured INTEGER DEFAULT 0,
      display_order INTEGER DEFAULT 0
    );
  `);
}

// Run schema initialization
initSchema();

module.exports = db;
