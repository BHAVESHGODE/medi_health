const express = require('express');
const {
    createPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient
} = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // All routes below are protected

router
    .route('/')
    .get(getPatients)
    .post(authorize('admin', 'doctor', 'receptionist'), createPatient);

router
    .route('/:id')
    .get(getPatient)
    .put(authorize('admin', 'doctor', 'receptionist'), updatePatient)
    .delete(authorize('admin'), deletePatient);

module.exports = router;
