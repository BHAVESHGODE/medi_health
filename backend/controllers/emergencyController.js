const EmergencyCase = require('../models/EmergencyCase');

// @desc    Register new emergency case
// @route   POST /api/emergency
// @access  Private (Nurse, Doctor, Admin, Receptionist)
exports.createEmergencyCase = async (req, res, next) => {
    try {
        const emergencyCase = await EmergencyCase.create(req.body);

        // Alert ER staff via Socket.IO
        const io = req.app.get('io');
        io.emit('emergency_alert', {
            message: `New ${emergencyCase.triageLevel} Emergency Case!`,
            case: emergencyCase
        });

        res.status(201).json({
            success: true,
            data: emergencyCase
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get all emergency cases
// @route   GET /api/emergency
// @access  Private
exports.getEmergencyCases = async (req, res, next) => {
    try {
        const cases = await EmergencyCase.find(req.query).sort('-createdAt');

        res.status(200).json({
            success: true,
            count: cases.length,
            data: cases
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update case status/triage
// @route   PUT /api/emergency/:id
// @access  Private
exports.updateEmergencyCase = async (req, res, next) => {
    try {
        let emergencyCase = await EmergencyCase.findById(req.params.id);

        if (!emergencyCase) {
            return res.status(404).json({ success: false, message: 'Case not found' });
        }

        emergencyCase = await EmergencyCase.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        const io = req.app.get('io');
        io.emit('emergency_updated', {
            message: `Case updated: ${emergencyCase.status}`,
            case: emergencyCase
        });

        res.status(200).json({
            success: true,
            data: emergencyCase
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
