const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Bill = require('../models/Bill');

// @desc    Get dashboard analytics
// @route   GET /api/analytics
// @access  Private (Admin)
exports.getAnalytics = async (req, res, next) => {
    try {
        // 1. Total Patients
        const totalPatients = await Patient.countDocuments();

        // 2. Appointments Today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const appointmentsToday = await Appointment.countDocuments({
            appointmentDate: { $gte: today, $lt: tomorrow }
        });

        // 3. Pending Bills (Revenue potential)
        const pendingBills = await Bill.aggregate([
            { $match: { status: 'Pending' } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);

        // 4. Patients joined this month (for chart)
        // Simple aggregation by day/month would be more complex, 
        // for now let's just send some summary stats.

        res.status(200).json({
            success: true,
            data: {
                totalPatients,
                appointmentsToday,
                pendingRevenue: pendingBills[0]?.total || 0,
                // Mock data for charts if DB is empty
                patientInflow: [12, 19, 3, 5, 2, 3], // Example array for Chart.js
                revenueTrend: [500, 1200, 900, 1500, 2000]
            }
        });

    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
