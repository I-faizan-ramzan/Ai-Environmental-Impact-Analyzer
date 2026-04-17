const express = require('express');
const router = express.Router();
const { getUsers, getAllHistory, getUserHistory, createAdmin } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/users').get(protect, admin, getUsers);
router.route('/create-admin').post(protect, admin, createAdmin);
router.route('/history').get(protect, admin, getAllHistory);
router.route('/users/:id/history').get(protect, admin, getUserHistory);

module.exports = router;
