const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const ErrorResponse = require('./src/utils/errorResponse');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/employees', require('./src/routes/employeeRoutes'));
app.use('/api/shifts', require('./src/routes/shiftRoutes'));

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    const error = { ...err };
    error.message = err.message;

    res.status(err.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});