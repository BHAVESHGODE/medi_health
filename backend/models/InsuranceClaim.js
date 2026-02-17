const mongoose = require('mongoose');

const insuranceClaimSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    bill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill',
        required: true
    },
    provider: {
        type: String, // e.g., "BlueCross", "Medicare"
        required: true
    },
    policyNumber: {
        type: String,
        required: true
    },
    claimAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Paid'],
        default: 'Pending'
    },
    submissionDate: {
        type: Date,
        default: Date.now
    },
    responseDate: Date,
    reason: String // Rejection reason etc.
}, { timestamps: true });

module.exports = mongoose.model('InsuranceClaim', insuranceClaimSchema);
