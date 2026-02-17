const InsuranceClaim = require('../models/InsuranceClaim');

// @desc    File new claim
// @route   POST /api/insurance
// @access  Private (Admin, Receptionist)
exports.createClaim = async (req, res, next) => {
    try {
        const claim = await InsuranceClaim.create(req.body);

        res.status(201).json({
            success: true,
            data: claim
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get all claims
// @route   GET /api/insurance
// @access  Private
exports.getClaims = async (req, res, next) => {
    try {
        const claims = await InsuranceClaim.find(req.query)
            .populate('patient', 'user')
            .populate({
                path: 'patient',
                populate: { path: 'user', select: 'name' }
            });

        res.status(200).json({
            success: true,
            count: claims.length,
            data: claims
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update claim status
// @route   PUT /api/insurance/:id
// @access  Private
exports.updateClaim = async (req, res, next) => {
    try {
        const claim = await InsuranceClaim.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: claim
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
