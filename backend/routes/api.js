const express = require('express');
const router = express.Router();
const { analyzeProduct, getHistory } = require('../controllers/analysisController');

const { protect } = require('../middleware/authMiddleware');

// Define API routes
router.post('/analyze', protect, analyzeProduct);
router.get('/history', protect, getHistory);

module.exports = router;
