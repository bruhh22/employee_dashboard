const express = require('express');
const { getEmployees } = require('../controllers/employeeController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getEmployees);

module.exports = router;