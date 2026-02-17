const Patient = require('../models/Patient');
const User = require('../models/User');

// @desc    Create new patient profile
// @route   POST /api/patients
// @access  Private (Admin, Doctor, Receptionist)
exports.createPatient = async (req, res, next) => {
    try {
        // Check if user exists first
        const user = await User.findById(req.body.user);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const patient = await Patient.create(req.body);

        res.status(201).json({
            success: true,
            data: patient
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private
exports.getPatients = async (req, res, next) => {
    try {
        let query;

        const reqQuery = { ...req.query };
        const removeFields = ['select', 'sort', 'page', 'limit'];
        removeFields.forEach(param => delete reqQuery[param]);

        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        query = Patient.find(JSON.parse(queryStr)).populate('user', 'name email');

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

        const patients = await query;

        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get single patient
// @route   GET /api/patients/:id
// @access  Private
exports.getPatient = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id).populate('user', 'name email');

        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        res.status(200).json({
            success: true,
            data: patient
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Private
exports.updatePatient = async (req, res, next) => {
    try {
        let patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: patient
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete patient
// @route   DELETE /api/patients/:id
// @access  Private (Admin only)
exports.deletePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        await patient.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
