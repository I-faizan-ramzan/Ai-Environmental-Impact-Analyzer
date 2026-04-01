const express = require('express');
const router = express.Router();
const { analyzeProduct, getHistory } = require('../controllers/analysisController');

// Define API routes
router.post('/analyze', analyzeProduct);
router.get('/history/:userId', getHistory);

module.exports = router;
