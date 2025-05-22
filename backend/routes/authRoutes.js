// /routes/authRoutes.js
const express = require('express');
const { register, login, updatePassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (require authentication)
router.put('/update-password', protect, updatePassword);

module.exports = router;