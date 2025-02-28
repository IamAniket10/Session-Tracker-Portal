const mongoose = require('mongoose');

const SessionDetailSchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sessionInsights: {
        type: String,
        default: ''
    },
    weekAchievement: {
        type: String,
        default: ''
    },
    decision: {
        type: String,
        default: ''
    },
    totalProfit: {
        type: Number,
        default: 0
    },
    invoiceProfit: {
        type: Number,
        default: 0
    },
    futureProfit: {
        type: Number,
        default: 0
    },
    costReductionProfit: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Compound index to ensure each user has only one detail record per session
SessionDetailSchema.index({ sessionId: 1, userId: 1 }, { unique: true });

const SessionDetail = mongoose.model('SessionDetail', SessionDetailSchema);

module.exports = SessionDetail;