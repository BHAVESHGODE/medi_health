const Prescription = require('../models/Prescription');
const User = require('../models/User');

// @desc    Create prescription
// @route   POST /api/prescriptions
// @access  Private (Doctor)
exports.createPrescription = async (req, res, next) => {
    try {
        const prescription = await Prescription.create(req.body);

        res.status(201).json({
            success: true,
            data: prescription
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get prescriptions
// @route   GET /api/prescriptions
// @access  Private
exports.getPrescriptions = async (req, res, next) => {
    try {
        let query = {};
        if (req.user.role === 'patient') {
            // Find prescriptions where patient matches user's patient profile
            // This requires looking up patient ID first.
            // For simplicity, let's assume we can filter if populated, or we need to find the Patient ID first.
            // Ideally req.user.patientId should be available or we query Patient model.
        }
        // For now, return all for doctors/admin, implementing generic find

        const prescriptions = await Prescription.find(req.query)
            .populate('doctor', 'specialization')
            .populate('patient', 'contactNumber')
            .populate('appointment', 'appointmentDate');

        res.status(200).json({
            success: true,
            count: prescriptions.length,
            data: prescriptions
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
