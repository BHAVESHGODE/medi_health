const express = require('express');
const {
    createDoctor,
    getDoctors,
    getDoctor,
    updateDoctor,
    deleteDoctor
} = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router
    .route('/')
    .get(getDoctors)
    .post(protect, authorize('admin', 'receptionist'), createDoctor);

router
    .route('/:id')
    .get(getDoctor)
    .put(protect, authorize('admin', 'doctor'), updateDoctor)
    .delete(protect, authorize('admin'), deleteDoctor);

module.exports = router;
