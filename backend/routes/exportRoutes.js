const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const ctrl = require('../controllers/exportController');

router.get('/patients', protect, authorize('admin', 'receptionist'), ctrl.exportPatients);
router.get('/appointments', protect, authorize('admin', 'receptionist', 'doctor'), ctrl.exportAppointments);
router.get('/inventory', protect, authorize('admin', 'nurse', 'receptionist'), ctrl.exportInventory);

module.exports = router;
