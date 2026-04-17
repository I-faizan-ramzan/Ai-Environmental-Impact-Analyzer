const User = require('../models/User');
const Entry = require('../models/Entry');

// @desc    Create an admin user
// @route   POST /api/admin/create-admin
// @access  Private/Admin
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please add all fields' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'admin',
      authProvider: 'local'
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error creating admin' });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error retrieving users' });
  }
};

// @desc    Get all histories across platform
// @route   GET /api/admin/history
// @access  Private/Admin
exports.getAllHistory = async (req, res) => {
  try {
    const entries = await Entry.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error retrieving all histories' });
  }
};

// @desc    Get specific user's history
// @route   GET /api/admin/users/:id/history
// @access  Private/Admin
exports.getUserHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const entries = await Entry.find({ userId: id }).sort({ createdAt: -1 });
    if (!entries) {
      return res.status(404).json({ error: 'No history found' });
    }
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error retrieving specific history' });
  }
};
