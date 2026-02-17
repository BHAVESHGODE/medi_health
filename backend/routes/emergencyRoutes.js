const express = require('express');
const {
    createEmergencyCase,
    getEmergencyCases,
    updateEmergencyCase
} = require('../controllers/emergencyController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getEmergencyCases)
    .post(authorize('admin', 'doctor', 'nurse', 'receptionist'), createEmergencyCase);

router.route('/:id')
    .put(authorize('admin', 'doctor', 'nurse'), updateEmergencyCase);

module.exports = router;
