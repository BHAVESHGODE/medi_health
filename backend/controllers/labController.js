const LabTest = require('../models/LabTest');

// @desc    Request new lab test
// @route   POST /api/lab
// @access  Private (Doctor)
exports.createLabTest = async (req, res, next) => {
    try {
        const labTest = await LabTest.create(req.body);
        res.status(201).json({ success: true, data: labTest });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get all lab tests
// @route   GET /api/lab
// @access  Private
exports.getLabTests = async (req, res, next) => {
    try {
        const tests = await LabTest.find(req.query)
            .populate('patient', 'user')
            .populate({
                path: 'patient',
                populate: { path: 'user', select: 'name' }
            })
            .populate('doctor', 'user')
            .populate({
                path: 'doctor',
                populate: { path: 'user', select: 'name' }
            });

        res.status(200).json({ success: true, count: tests.length, data: tests });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update lab test (e.g. upload result)
// @route   PUT /api/lab/:id
// @access  Private (Lab Tech, Doctor)
exports.updateLabTest = async (req, res, next) => {
    try {
        const labTest = await LabTest.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: labTest });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
