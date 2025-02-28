const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    sessionNumber: {
        type: Number,
        required: true,
        unique: true
    },
    sessionDate: {
        type: Date,
        required: true
    },
    sessionTime: {
        type: Number,
        required: true
    },
    weeklyEndDate: {
        type: Date,
        required: true
    },
    activityCovered: [{
        type: String,
        required: true
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Session = mongoose.model('Session', SessionSchema);
module.exports = Session;