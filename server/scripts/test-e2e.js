const app = require('../src/app');
const db = require('../src/config/db');

async function runTests() {
  console.log('🧪 ================================================');
  console.log('🧪 STARTING E2E BACKEND & DATABASE TEST SUITE');
  console.log('🧪 ================================================');

  const server = app.listen(5099, async () => {
    try {
      const baseUrl = 'http://localhost:5099/api';

      // 1. Health check
      console.log('\n[1/7] Testing GET /api/health...');
      const healthRes = await fetch(`${baseUrl}/health`);
      const health = await healthRes.json();
      console.log('  Status:', health.status);
      console.log('  Agency:', health.agency);
      console.log('  Tagline:', health.tagline);
      if (health.status !== 'ok' || health.agency !== 'SM Vision Pixel') {
        throw new Error('Health check test failed');
      }
      console.log('  ✅ /api/health PASSED');

      // 2. Services endpoint
      console.log('\n[2/7] Testing GET /api/services...');
      const srvRes = await fetch(`${baseUrl}/services`);
      const srvData = await srvRes.json();
      console.log(`  Received ${srvData.count} services.`);
      if (srvData.count !== 13) {
        throw new Error(`Expected 13 services, got ${srvData.count}`);
      }
      console.log('  ✅ /api/services PASSED');

      // 3. Contact Form Submission
      console.log('\n[3/7] Testing POST /api/contact...');
      const contactPayload = {
        name: 'Aarav Patel',
        email: 'aarav.patel@example.com',
        phone: '+91 9876543210',
        business_name: 'Patel Creative Works',
        service: 'Social Media Poster Designing',
        budget_range: '₹2,000 - ₹5,000',
        message: 'Looking for 10 custom Instagram posters for our upcoming product launch.'
      };
      const contactRes = await fetch(`${baseUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactPayload)
      });
      const contactJson = await contactRes.json();
      console.log('  Response:', contactJson.message);
      if (!contactJson.success || !contactJson.inquiryId) {
        throw new Error('Contact submission test failed');
      }
      console.log('  ✅ POST /api/contact PASSED (Inquiry ID: ' + contactJson.inquiryId + ')');

      // 4. Quotation Request Submission
      console.log('\n[4/7] Testing POST /api/quote...');
      const quotePayload = {
        name: 'Neha Sharma',
        email: 'neha.sharma@example.com',
        phone: '+91 9123456789',
        business_name: 'Modern Aesthetics Brand',
        service: 'Website Development',
        budget_range: '₹15,000 - ₹50,000',
        message: 'Need a fast agency website built with modern UI, responsive layout and inquiry forms.'
      };
      const quoteRes = await fetch(`${baseUrl}/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quotePayload)
      });
      const quoteJson = await quoteRes.json();
      console.log('  Response:', quoteJson.message);
      if (!quoteJson.success || !quoteJson.inquiryId) {
        throw new Error('Quote submission test failed');
      }
      console.log('  ✅ POST /api/quote PASSED (Inquiry ID: ' + quoteJson.inquiryId + ')');

      // 5. Admin Authentication
      console.log('\n[5/7] Testing POST /api/admin/login...');
      const loginRes = await fetch(`${baseUrl}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'admin@smvisionpixel.com',
          password: 'Admin@SMVision2025!'
        })
      });
      const loginJson = await loginRes.json();
      if (!loginJson.success || !loginJson.token) {
        throw new Error('Admin login test failed: ' + (loginJson.error || 'No token'));
      }
      const adminToken = loginJson.token;
      console.log('  Admin Authenticated. User:', loginJson.user.email);
      console.log('  ✅ Admin Login PASSED');

      // 6. Admin Get Inquiries
      console.log('\n[6/7] Testing GET /api/admin/inquiries...');
      const inqRes = await fetch(`${baseUrl}/admin/inquiries`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      const inqJson = await inqRes.json();
      console.log(`  Retrieved ${inqJson.data.length} inquiries. Stats:`, inqJson.stats);
      if (!inqJson.success || inqJson.data.length < 2) {
        throw new Error('Admin inquiries retrieval failed');
      }
      console.log('  ✅ Admin Get Inquiries PASSED');

      // 7. Update Inquiry Status
      console.log('\n[7/8] Testing PATCH /api/admin/inquiries/:id/status...');
      const targetId = contactJson.inquiryId;
      const statusRes = await fetch(`${baseUrl}/admin/inquiries/${targetId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ status: 'Contacted' })
      });
      const statusJson = await statusRes.json();
      console.log('  Response:', statusJson.message);
      if (!statusJson.success) {
        throw new Error('Status update test failed: ' + statusJson.error);
      }

      // Verify in DB directly
      const updatedRow = db.prepare('SELECT status FROM inquiries WHERE id = ?').get(targetId);
      console.log('  Verified in SQLite DB: status =', updatedRow.status);
      if (updatedRow.status !== 'Contacted') {
        throw new Error('Database status verification failed');
      }
      console.log('  ✅ Inquiry Status Update PASSED');

      // 8. Client Portal Lookup
      console.log('\n[8/8] Testing POST /api/client/lookup...');
      const clientRes = await fetch(`${baseUrl}/client/lookup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: 'aarav.patel@example.com' })
      });
      const clientJson = await clientRes.json();
      console.log(`  Client lookup retrieved ${clientJson.count} projects for ${clientJson.clientName}`);
      if (!clientJson.success || clientJson.count === 0) {
        throw new Error('Client lookup test failed');
      }
      console.log('  ✅ Client Portal Lookup PASSED');

      console.log('\n🎉 ALL 8 E2E INTEGRATION TESTS PASSED 100% SUCCESSFULLY!\n');
    } catch (err) {
      console.error('\n❌ TEST FAILED:', err);
      process.exitCode = 1;
    } finally {
      server.close(() => {
        process.exit(process.exitCode || 0);
      });
    }
  });
}

runTests();
