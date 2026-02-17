const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const ctrl = require('../controllers/searchController');

router.get('/', protect, ctrl.globalSearch);

module.exports = router;
