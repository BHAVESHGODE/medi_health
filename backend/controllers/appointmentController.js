const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

// @desc    Book an appointment
// @route   POST /api/appointments
// @access  Private (Patient, Receptionist)
exports.createAppointment = async (req, res, next) => {
    try {
        const { doctorId, patientId, appointmentDate, timeSlot, reason } = req.body;

        // Validate Doctor
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        // Validate Patient
        // If patient is booking, use req.user.id to find Patient profile
        // If receptionist, use patientId from body
        let patient;
        if (req.user.role === 'patient') {
            patient = await Patient.findOne({ user: req.user.id });
        } else if (patientId) {
            patient = await Patient.findById(patientId);
        }

        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient profile not found' });
        }

        const appointment = await Appointment.create({
            doctor: doctorId,
            patient: patient._id,
            appointmentDate,
            timeSlot,
            reason,
            status: 'Pending'
        });

        // Real-time notification to Doctor
        // We can emit to a specific room if we implement room logic, for now broadcast or generic
        // Ideally: io.to(doctorUserId).emit(...)
        const io = req.app.get('io');
        io.emit('new_appointment', {
            message: 'New appointment booked',
            appointment
        });

        res.status(201).json({
            success: true,
            data: appointment
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get appointments
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = async (req, res, next) => {
    try {
        let query;
        // If patient, get their appointments
        // If doctor, get their appointments
        // If admin/receptionist, get all (with filters)

        let filter = {};
        if (req.user.role === 'patient') {
            const patient = await Patient.findOne({ user: req.user.id });
            if (patient) filter.patient = patient._id;
        } else if (req.user.role === 'doctor') {
            const doctor = await Doctor.findOne({ user: req.user.id });
            if (doctor) filter.doctor = doctor._id;
        }

        // Merge with query params
        // ... basic filtering logic

        const appointments = await Appointment.find({ ...filter, ...req.query })
            .populate('doctor', 'specialization user')
            .populate({
                path: 'doctor',
                populate: { path: 'user', select: 'name' }
            })
            .populate('patient', 'user')
            .populate({
                path: 'patient',
                populate: { path: 'user', select: 'name email' }
            });

        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private (Doctor, Admin, Receptionist)
exports.updateAppointment = async (req, res, next) => {
    try {
        let appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        // Verify ownership/permission...

        appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Real-time update
        const io = req.app.get('io');
        io.emit('appointment_updated', {
            message: `Appointment ${appointment.status}`,
            appointment
        });

        res.status(200).json({
            success: true,
            data: appointment
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
