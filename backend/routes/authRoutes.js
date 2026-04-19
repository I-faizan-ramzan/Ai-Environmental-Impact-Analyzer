const express = require('express');
const router = express.Router();
const { loginUser, getMe, registerUser, getLeaderboard } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
