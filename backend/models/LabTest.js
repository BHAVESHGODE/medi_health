const mongoose = require('mongoose');

const labTestSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    testType: {
        type: String, // e.g., "Blood Test", "X-Ray", "MRI"
        required: true
    },
    status: {
        type: String,
        enum: ['Requested', 'Sample Collected', 'Processing', 'Completed', 'Cancelled'],
        default: 'Requested'
    },
    resultFile: {
        type: String // URL to uploaded report
    },
    resultNotes: String,
    technician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Staff/Nurse
    },
    priority: {
        type: String,
        enum: ['Routine', 'Urgent', 'Stat'],
        default: 'Routine'
    }
}, { timestamps: true });

module.exports = mongoose.model('LabTest', labTestSchema);
