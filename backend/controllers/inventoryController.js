const Inventory = require('../models/Inventory');

// @desc    Add inventory item
// @route   POST /api/inventory
// @access  Private (Admin)
exports.addItem = async (req, res, next) => {
    try {
        const item = await Inventory.create(req.body);

        res.status(201).json({
            success: true,
            data: item
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get inventory
// @route   GET /api/inventory
// @access  Private
exports.getInventory = async (req, res, next) => {
    try {
        const items = await Inventory.find(req.query);

        res.status(200).json({
            success: true,
            count: items.length,
            data: items
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
