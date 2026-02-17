const express = require('express');
const { createPrescription, getPrescriptions } = require('../controllers/prescriptionController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getPrescriptions)
    .post(authorize('doctor'), createPrescription);

module.exports = router;
