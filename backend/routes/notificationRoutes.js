const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const ctrl = require('../controllers/notificationController');

router.post('/', protect, ctrl.createNotification);
router.get('/me', protect, ctrl.getMyNotifications);
router.patch('/:id/read', protect, ctrl.markRead);
router.delete('/me', protect, ctrl.clearAll);

module.exports = router;
