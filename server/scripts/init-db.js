require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const bcrypt = require('bcryptjs');
const db = require('../src/config/db');
const { DEFAULT_SERVICES } = require('../src/controllers/serviceController');

function seedDatabase() {
  console.log('🚀 Initializing SM Vision Pixel SQLite Database...');

  // 1. Seed Services
  const existingCount = db.prepare('SELECT COUNT(*) as count FROM services').get().count;
  if (existingCount === 0) {
    console.log('📦 Seeding initial 13 creative agency services...');
    const insertService = db.prepare(`
      INSERT INTO services (name, slug, category, price_label, description, icon_name, featured, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    DEFAULT_SERVICES.forEach((srv, index) => {
      insertService.run(
        srv.name,
        srv.slug,
        srv.category,
        srv.price_label,
        srv.description,
        srv.icon_name,
        srv.featured,
        index + 1
      );
    });
    console.log(`✅ ${DEFAULT_SERVICES.length} services seeded successfully.`);
  } else {
    console.log(`ℹ️ Services already seeded (${existingCount} records).`);
  }

  // 2. Seed Default Admin User
  const adminEmail = process.env.ADMIN_DEFAULT_USER || 'admin@smvisionpixel.com';
  const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@SMVision2025!';

  const existingAdmin = db.prepare('SELECT id FROM admin_users WHERE email = ?').get(adminEmail.toLowerCase());

  if (!existingAdmin) {
    console.log(`👤 Creating initial secure admin user: ${adminEmail}`);
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(adminPassword, salt);

    const insertAdmin = db.prepare(`
      INSERT INTO admin_users (username, email, password_hash, role)
      VALUES (?, ?, ?, 'admin')
    `);

    insertAdmin.run(adminEmail.split('@')[0], adminEmail.toLowerCase(), passwordHash);
    console.log('✅ Admin user created successfully.');
  } else {
    console.log(`ℹ️ Admin user (${adminEmail}) already exists.`);
  }

  console.log('🎉 Database initialization complete!');
}

seedDatabase();
