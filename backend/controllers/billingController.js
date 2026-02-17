const Bill = require('../models/Bill');

// @desc    Create bill
// @route   POST /api/bills
// @access  Private (Admin, Receptionist)
exports.createBill = async (req, res, next) => {
    try {
        const bill = await Bill.create(req.body);

        res.status(201).json({
            success: true,
            data: bill
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get bills
// @route   GET /api/bills
// @access  Private
exports.getBills = async (req, res, next) => {
    try {
        const bills = await Bill.find(req.query)
            .populate('patient', 'user')
            .populate({
                path: 'patient',
                populate: { path: 'user', select: 'name' }
            });

        res.status(200).json({
            success: true,
            count: bills.length,
            data: bills
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
