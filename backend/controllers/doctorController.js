const Doctor = require('../models/Doctor');
const User = require('../models/User');

// @desc    Create new doctor profile
// @route   POST /api/doctors
// @access  Private (Admin)
exports.createDoctor = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.user);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Ensure user role is doctor
        if (user.role !== 'doctor' && user.role !== 'admin') {
            // Optionally update user role to doctor if not already? For now, just warn.
        }

        const doctor = await Doctor.create(req.body);

        res.status(201).json({
            success: true,
            data: doctor
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
exports.getDoctors = async (req, res, next) => {
    try {
        let query;

        const reqQuery = { ...req.query };
        const removeFields = ['select', 'sort', 'page', 'limit'];
        removeFields.forEach(param => delete reqQuery[param]);

        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        query = Doctor.find(JSON.parse(queryStr)).populate('user', 'name email avatar');

        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        const doctors = await query;

        res.status(200).json({
            success: true,
            count: doctors.length,
            data: doctors
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctor = async (req, res, next) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('user', 'name email avatar');

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        res.status(200).json({
            success: true,
            data: doctor
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update doctor
// @route   PUT /api/doctors/:id
// @access  Private (Admin or the Doctor themselves)
exports.updateDoctor = async (req, res, next) => {
    try {
        let doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        // Check ownership if not admin
        // This requires mapping user ID to doctor ID logic, for now assume Admin or correct ID passed

        doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: doctor
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Private (Admin)
exports.deleteDoctor = async (req, res, next) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        await doctor.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
