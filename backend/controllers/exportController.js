const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Inventory = require('../models/Inventory');

function toCSV(rows, fields) {
  const header = fields.join(',');
  const body = rows.map(r => fields.map(f => {
    const v = r[f];
    if (v === null || v === undefined) return '';
    const s = typeof v === 'object' ? JSON.stringify(v) : String(v);
    return '"' + s.replace(/"/g, '""') + '"';
  }).join(',')).join('\n');
  return header + '\n' + body;
}

exports.exportPatients = async (req, res) => {
  try {
    const data = await Patient.find({}).limit(10000).lean();
    const fields = ['_id', 'name', 'email', 'phone', 'address', 'createdAt'];
    const csv = toCSV(data, fields);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="patients.csv"');
    res.send(csv);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.exportAppointments = async (req, res) => {
  try {
    const data = await Appointment.find({}).limit(10000).lean();
    const fields = ['_id', 'patient', 'doctor', 'date', 'status', 'createdAt'];
    const csv = toCSV(data, fields);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="appointments.csv"');
    res.send(csv);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.exportInventory = async (req, res) => {
  try {
    const data = await Inventory.find({}).limit(10000).lean();
    const fields = ['_id', 'name', 'quantity', 'price', 'category', 'createdAt'];
    const csv = toCSV(data, fields);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="inventory.csv"');
    res.send(csv);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
