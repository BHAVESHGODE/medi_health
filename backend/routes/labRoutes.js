const express = require('express');
const { createLabTest, getLabTests, updateLabTest } = require('../controllers/labController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getLabTests)
    .post(authorize('doctor'), createLabTest);

router.route('/:id').put(authorize('doctor', 'admin'), updateLabTest);

module.exports = router;
