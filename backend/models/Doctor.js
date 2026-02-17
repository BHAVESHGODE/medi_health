const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    qualifications: [String],
    experience: {
        type: Number, // Years of experience
        default: 0
    },
    department: {
        type: String,
        required: true
    },
    hospitalAffiliation: String,
    consultationFee: {
        type: Number,
        required: true
    },
    availability: [{ // Weekly schedule
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        startTime: String, // e.g., "09:00"
        endTime: String    // e.g., "17:00"
    }]
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
