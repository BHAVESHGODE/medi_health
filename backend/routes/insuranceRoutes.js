const express = require('express');
const { createClaim, getClaims, updateClaim } = require('../controllers/insuranceController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getClaims)
    .post(authorize('admin', 'receptionist'), createClaim);

router.route('/:id').put(authorize('admin'), updateClaim);

module.exports = router;
