const Homework = require('../models/Homework');
const Session = require('../models/Session');
const asyncHandler = require('express-async-handler');

// get all homework for a user
const getAllHomework = asyncHandler(async (req, res) => {
    const homework = await Homework.find({
        user: req.user._id,
        isActive: true
    })
        .populate('session', 'sessionNumber sessionDate')
        .sort({ dueDate: 1 });

    res.status(200).json(homework);
});


// get homework by session
const getHomeworkBySession = asyncHandler(async (req, res) => {
    const homework = await Homework.find({
        session: req.params.sessionId,
        user: req.user._id,
        isActive: true
    })
        .sort({ dueDate: 1 });

    res.status(200).json(homework);
});


// create new homework
const createHomework = asyncHandler(async (req, res) => {
    const {
        title,
        status,
        dueDate,
        startTime,
        endTime,
        fpr,
        dpRemark,
        penaltyReward,
        isImposed,
        session
    } = req.body;

    //check if session exists
    const sessionExists = await Session.findById(session);
    if (!sessionExists) {
        res.status(404);
        throw new Error('Session not found');
    }

    const homework = await Homework.create({
        title,
        status,
        dueDate,
        startTime,
        endTime,
        fpr,
        dpRemark,
        penaltyReward,
        isImposed,
        session,
        user: req.user._id
    });

    res.status(201).json(homework);
});



// update homework
const updateHomework = asyncHandler(async (req, res) => {
    const homework = await Homework.findById(req.params.id);

    if (!homework) {
        res.status(404);
        throw new Error('Homework not found');
    }


    //check if homework belongs to user or user is admin
    if (homework.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        res.status(401);
        throw new Error('Not Authorized');
    }

    const updatedHomework = await Homework.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    );

    res.status(200).json(updatedHomework);
})


// delete homework (soft delete)
const deleteHomework = asyncHandler(async (req, res) => {
    const homework = await Homework.findById(req.params.id);

    if (!homework) {
        res.status(404);
        throw new Error('Homework not found');
    }

    // Check if homework belongs to user or user is admin
    if (homework.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        res.status(401);
        throw new Error('Not authorized');
    }

    await Homework.findByIdAndUpdate(
        req.params.id,
        { isActive: false }
    );

    res.status(200).json({ message: 'Homework deleted successfully' });
})


// get all homework for admin (across all users)
const getAllHomeworkAdmin = asyncHandler(async (req, res) => {
    const homework = await Homework.find({ isActive: true })
        .populate('user', 'name email')
        .populate('session', 'sessionNumber sessionDate')
        .sort({ dueDate: 1 });

    res.status(200).json(homework);
});

module.exports = {
    getAllHomework,
    getHomeworkBySession,
    createHomework,
    updateHomework,
    deleteHomework,
    getAllHomeworkAdmin
};