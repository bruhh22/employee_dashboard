const express = require('express');
const { createShift, getShifts, deleteShift } = require('../controllers/shiftController');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const router = express.Router();

router.use(protect); // All routes protected

router.route('/')
    .get(getShifts)
    .post(authorize('admin'), createShift);

router.route('/:id')
    .delete(authorize('admin'), deleteShift);

module.exports = router;