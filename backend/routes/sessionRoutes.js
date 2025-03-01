const express = require('express')
const router = express.Router();

const {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
  getSessionDetailsByUser,
  getAllSessionDetails,
  upsertSessionDetails
} = require('../controllers/sessionController');
const { protect, admin } = require('../middleware/authMiddleware');

// Session routes
router.get('/', protect, getAllSessions);
router.get('/:id', protect, getSessionById);

//session management (admin only)
router.post('/', protect, admin, createSession);
router.put('/:id', protect, admin, updateSession);
router.delete('/:id', protect, admin, deleteSession);

// session details routes (user specific)
router.get('/:sessionId/details', protect, getSessionDetailsByUser);
router.put('/:sessionId/details', protect, upsertSessionDetails);

// get all user details for a session (admin only)
router.get('/:sessionId/all-details', protect, admin, getAllSessionDetails);

module.exports = router;