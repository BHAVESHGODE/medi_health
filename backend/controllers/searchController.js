const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');

exports.globalSearch = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.json({ success: true, data: { patients: [], doctors: [], appointments: [], prescriptions: [] } });

    const regex = new RegExp(q, 'i');

    const [patients, doctors, appointments, prescriptions] = await Promise.all([
      Patient.find({ $or: [{ name: regex }, { email: regex }, { phone: regex }] }).limit(20),
      Doctor.find({ $or: [{ specialization: regex }] }).populate('user', 'name email role').limit(20),
      Appointment.find({ $or: [{ status: regex }] }).populate('patient doctor').limit(20),
      Prescription.find({ $or: [{ medication: regex }, { notes: regex }] }).limit(20),
    ]);

    res.json({ success: true, data: { patients, doctors, appointments, prescriptions } });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
