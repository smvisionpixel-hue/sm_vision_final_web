const express = require('express');
const router = express.Router();
const { getServices } = require('../controllers/serviceController');

// GET /api/services
router.get('/services', getServices);

module.exports = router;
