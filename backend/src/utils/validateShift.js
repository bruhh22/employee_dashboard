const Shift = require('../models/Shift');
const ErrorResponse = require('./errorResponse');

/**
 * Converts HH:mm string to minutes since midnight
 */
const getMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};

/**
 * Validates business rules:
 * 1. Duration >= 4 hours
 * 2. No overlapping shifts for same employee on same date
 */
const validateShiftLogic = async (employeeId, date, startTime, endTime) => {
    const startMin = getMinutes(startTime);
    const endMin = getMinutes(endTime);

    // Rule 1: Shift Must Be Minimum 4 Hours
    // Handle overnight shifts if necessary (end < start), but assuming same-day for simplicity per prompt
    // If endMin < startMin, it implies next day, but prompt says "same date". 
    // We assume standard same-day shifts.
    if (endMin - startMin < 240) {
        throw new ErrorResponse('Shift duration must be at least 4 hours.', 400);
    }

    // Rule 2: No Overlapping Shifts
    const existingShifts = await Shift.find({
        employeeId,
        date
    });

    for (const shift of existingShifts) {
        const existStart = getMinutes(shift.startTime);
        const existEnd = getMinutes(shift.endTime);

        // Overlap formula: (StartA < EndB) and (EndA > StartB)
        if (startMin < existEnd && endMin > existStart) {
            throw new ErrorResponse(
                `Shift overlaps with an existing shift (${shift.startTime} - ${shift.endTime})`,
                409
            );
        }
    }

    return true;
};

module.exports = validateShiftLogic;