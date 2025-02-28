const express = require('express');
const router = express.Router();
const {
  getAllHomework,
  getHomeworkBySession,
  createHomework,
  updateHomework,
  deleteHomework,
  getAllHomeworkAdmin
} = require('../controllers/homeworkController');
const { protect, admin } = require('../middleware/authMiddleware');

// User routes
router.get('/', protect, getAllHomework);
router.get('/session/:sessionId', protect, getHomeworkBySession);
router.post('/', protect, createHomework);
router.put('/:id', protect, updateHomework);
router.delete('/:id', protect, deleteHomework);

// Admin routes
router.get('/admin/all', protect, admin, getAllHomeworkAdmin);

module.exports = router;