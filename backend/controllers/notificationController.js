const Notification = require('../models/Notification');
const Homework = require('../models/Homework');
const asyncHandler = require('express-async-handler');

// Get all notifications for a user
const getUserNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    user: req.user._id,
    isActive: true
  })
  .sort({ createdAt: -1 });
  
  res.status(200).json(notifications);
});

// Mark notification as read
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  
  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }
  
  // Check if notification belongs to user
  if (notification.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }
  
  notification.isRead = true;
  await notification.save();
  
  res.status(200).json({ message: 'Notification marked as read' });
});

// Mark all notifications as read
const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { user: req.user._id, isRead: false, isActive: true },
    { isRead: true }
  );
  
  res.status(200).json({ message: 'All notifications marked as read' });
});

// Create notification for upcoming homework (to be run by a scheduler)
const createHomeworkReminders = asyncHandler(async (req, res) => {
  // Get upcoming homework due in the next 24 hours
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const upcomingHomework = await Homework.find({
    dueDate: { $gte: today, $lte: tomorrow },
    status: { $ne: 'Done' },
    isActive: true
  }).populate('user');
  
  // Create notifications
  const notifications = [];
  
  for (const homework of upcomingHomework) {
    // Check if a notification already exists for this homework
    const existingNotification = await Notification.findOne({
      user: homework.user._id,
      reference: homework._id,
      refModel: 'Homework',
      isActive: true
    });
    
    if (!existingNotification) {
      const dueDate = new Date(homework.dueDate).toLocaleDateString();
      
      const notification = await Notification.create({
        user: homework.user._id,
        title: 'Homework Due Soon',
        message: `Your homework "${homework.title}" is due on ${dueDate}`,
        type: 'homework',
        reference: homework._id,
        refModel: 'Homework'
      });
      
      notifications.push(notification);
    }
  }
  
  res.status(200).json({
    message: `Created ${notifications.length} notifications`,
    notifications
  });
});

module.exports = {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  createHomeworkReminders
};