const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    date: { type: String, required: true }, // Format YYYY-MM-DD
    startTime: { type: String, required: true }, // Format HH:mm
    endTime: { type: String, required: true } // Format HH:mm
}, { timestamps: true });

module.exports = mongoose.model('Shift', shiftSchema);