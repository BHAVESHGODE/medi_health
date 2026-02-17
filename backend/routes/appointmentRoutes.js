const express = require('express');
const {
    createAppointment,
    getAppointments,
    updateAppointment
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router
    .route('/')
    .get(getAppointments)
    .post(authorize('patient', 'receptionist'), createAppointment);

router
    .route('/:id')
    .put(authorize('doctor', 'admin', 'receptionist'), updateAppointment);

module.exports = router;
