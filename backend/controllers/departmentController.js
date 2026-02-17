const Department = require('../models/Department');

// @desc    Get all departments
// @route   GET /api/departments
// @access  Public
exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.find().populate('head');
        res.status(200).json({
            success: true,
            data: departments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single department
// @route   GET /api/departments/:id
// @access  Public
exports.getDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id).populate('head');
        if (!department) {
            return res.status(404).json({
                success: false,
                message: 'Department not found'
            });
        }
        res.status(200).json({
            success: true,
            data: department
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Create department
// @route   POST /api/departments
// @access  Private (Admin)
exports.createDepartment = async (req, res) => {
    try {
        const { name, head, description, staffCount } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Department name is required'
            });
        }

        const department = await Department.create({
            name,
            head,
            description,
            staffCount: staffCount || 0
        });

        res.status(201).json({
            success: true,
            data: department
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update department
// @route   PUT /api/departments/:id
// @access  Private (Admin)
exports.updateDepartment = async (req, res) => {
    try {
        let department = await Department.findById(req.params.id);

        if (!department) {
            return res.status(404).json({
                success: false,
                message: 'Department not found'
            });
        }

        department = await Department.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: department
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete department
// @route   DELETE /api/departments/:id
// @access  Private (Admin)
exports.deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndDelete(req.params.id);

        if (!department) {
            return res.status(404).json({
                success: false,
                message: 'Department not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
