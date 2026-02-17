const express = require('express');
const { addItem, getInventory } = require('../controllers/inventoryController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getInventory)
    .post(authorize('admin'), addItem);

module.exports = router;
