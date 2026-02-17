const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const ctrl = require('../controllers/triageController');

router.post('/assess', protect, ctrl.assess);
router.get('/board', protect, ctrl.board);

module.exports = router;
