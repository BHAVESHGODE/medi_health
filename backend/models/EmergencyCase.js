const mongoose = require('mongoose');

const emergencyCaseSchema = new mongoose.Schema({
    patientName: { // Can be raw string if unknown/unregistered
        type: String,
        required: true
    },
    patientId: { // Optional ref if registered
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    triageLevel: {
        type: String,
        enum: ['Critical', 'Urgent', 'Non-Urgent', 'Resuscitation'],
        required: true
    },
    chiefComplaint: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Incoming', 'Admitted', 'Observation', 'Discharged', 'Deceased'],
        default: 'Incoming'
    },
    assignedDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    ambulanceLocation: { // Simulated lat/lng for tracking
        lat: Number,
        lng: Number,
        eta: String // Estimated Time of Arrival
    },
    vitals: {
        bp: String,
        hr: String,
        spo2: String,
        temp: String
    },
    notes: String
}, { timestamps: true });

module.exports = mongoose.model('EmergencyCase', emergencyCaseSchema);
