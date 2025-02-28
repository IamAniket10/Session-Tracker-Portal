const express = require('express');
const router = express.Router();
const {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  createHomeworkReminders
} = require('../controllers/notificationController');
const { protect, admin } = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler')
const Notification = require('../models/Notification')


// User routes
router.get('/', protect, getUserNotifications);
router.put('/:id/read', protect, markAsRead);
router.put('/read-all', protect, markAllAsRead);

// Admin route for generating notifications
router.post('/homework-reminders', protect, admin, createHomeworkReminders);

// Test route to create a notification
router.post('/test-notification', protect, asyncHandler(async (req, res) => {
    const notification = await Notification.create({
      user: req.user._id,
      title: 'Test Notification',
      message: 'This is a test notification for homework',
      type: 'homework',
      isRead: false
    });
    
    res.status(201).json(notification);
  }));

module.exports = router;