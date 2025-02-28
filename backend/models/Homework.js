const mongoose = require('mongoose');

const HomeworkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['To-Do', 'In Progress', 'Done'],
        default: 'To-Do'
    },
    dueDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    fpr: {
        type: String
    },
    dpRemark: {
        type: String
    },
    penaltyReward: {
        type: String
    },
    isImposed: {
        type: Boolean,
        default: false
    },
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Homework = mongoose.model('Homework', HomeworkSchema);
module.exports = Homework;