const express = require('express');
const { createBill, getBills } = require('../controllers/billingController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getBills)
    .post(authorize('admin', 'receptionist'), createBill);

module.exports = router;
