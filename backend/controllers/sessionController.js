const Session = require('../models/Session');
const SessionDetail = require('../models/SessionDetail');
const asyncHandler = require('express-async-handler');

// get all sessions
const getAllSessions = asyncHandler(async (req, res) => {
    const sessions = await Session.find({ isActive: true })
        .select('sessionNumber sessionDate')
        .sort({ sessionDate: -1 });

    res.status(200).json(sessions);
});


// get single session
const getSessionById = asyncHandler(async (req, res) => {
    const session = await Session.findById(req.params.id);

    if (!session) {
        res.status(404);
        throw new Error('Session not found');
    }

    res.status(200).json(session);
});


//create new session (admin only)
const createSession = asyncHandler(async (req, res) => {
    const {
        sessionNumber,
        sessionDate,
        sessionTime,
        weeklyEndDate,
        activityCovered
    } = req.body;

    const session = await Session.create({
        sessionNumber,
        sessionDate,
        sessionTime,
        weeklyEndDate,
        activityCovered,
        createdBy: req.user._id
    });

    res.status(201).json(session);
});


// update session (admin only)
const updateSession = asyncHandler(async (req, res) => {
    const session = await Session.findById(req.params.id);

    if (!session) {
        res.status(404);
        throw new Error('Session not found');
    }

    const updatedSession = await Session.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    );

    res.status(200).json(updatedSession);
});

//Delete session
const deleteSession = asyncHandler(async (req, res) => {
    const session = await Session.findById(req.params.id);

    if (!session) {
        res.status(404);
        throw new Error('Session not found');
    }

    await Session.findByIdAndUpdate(
        req.params.id,
        { isActive: false }
    );

    res.status(200).json({ message: 'Session deleted successfully' });
})

// get session details for a user
const getSessionDetailsByUser = asyncHandler(async (req, res) => {
    const details = await SessionDetail.findOne({
        sessionId: req.params.sessionId,
        userId: req.user._id
    });


    // if no details found, return empty object
    if (!details) {
        return res.status(200).json({
            sessionId: req.params.sessionId,
            userId: req.user._id,
            sessionInsights: '',
            weekAchievement: '',
            decision: '',
            totalProfit: 0,
            invoiceProfit: 0,
            futureProfit: 0,
            costReductionProfit: 0
        });
    }

    res.status(200).json(details);
});


// get all session details (admin only)

const getAllSessionDetails = asyncHandler(async (req, res) => {
    const details = await SessionDetail.find({
        sessionId: req.params.sessionId
    }).populate('userId', 'name email');

    res.status(200).json(details);
});


//create/update session details (user)
const upsertSessionDetails = asyncHandler(async (req, res) => {
    const {
        sessionInsights,
        weekAchievement,
        decision,
        totalProfit,
        invoiceProfit,
        futureProfit,
        costReductionProfit
    } = req.body;

    const details = await SessionDetail.findOneAndUpdate(
        {
            sessionId: req.params.sessionId,
            userId: req.user._id
        },
        {
            sessionInsights,
            weekAchievement,
            decision,
            totalProfit,
            invoiceProfit,
            futureProfit,
            costReductionProfit
        },
        { new: true, upsert: true }
    );

    res.status(200).json(details);
});


module.exports = {
    getAllSessions,
    getSessionById,
    createSession,
    updateSession,
    deleteSession,
    getSessionDetailsByUser,
    getAllSessionDetails,
    upsertSessionDetails
};
