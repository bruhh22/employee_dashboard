const Shift = require('../models/Shift');
const validateShiftLogic = require('../utils/validateShift');
const User = require('../models/User');

exports.createShift = async (shiftData) => {
    const { employeeId, date, startTime, endTime } = shiftData;

    // Validate Business Rules
    await validateShiftLogic(employeeId, date, startTime, endTime);

    const shift = await Shift.create({
        employeeId,
        date,
        startTime,
        endTime
    });

    return shift;
};

exports.getShifts = async (user, query) => {
    let filter = {};

    if (user.role === 'admin') {
        // Admin can see all, or filter by specific employee via query param
        if (query.employeeId) filter.employeeId = query.employeeId;
    } else {
        // Regular users can ONLY see their own shifts.
        // In a real app, we'd link User -> Employee.
        // For this assignment, we'll try to find an Employee record matching the User's email/name, 
        // OR assuming the 'User' is an Employee.
        // To keep it simple based on the Seed Data provided:
        // The "Normal User" doesn't strictly have an Employee ID linked in the prompt.
        // I will assume we filter by the user's ID if they are linked, 
        // OR we simply return nothing if not linked. 
        // *Fix for assignment:* I will auto-create a dummy Employee record for the "Normal User" in the seeder
        // so this logic works.

        // Attempting to find employee with same name as user
        const Employee = require('../models/Employee');
        const linkedEmployee = await Employee.findOne({ name: user.name }); // Simple linking strategy

        if (!linkedEmployee) {
            return []; // No shifts if not an employee
        }
        filter.employeeId = linkedEmployee._id;
    }

    const shifts = await Shift.find(filter)
        .populate('employeeId', 'name code department')
        .sort({ date: 1, startTime: 1 });

    return shifts;
};

exports.deleteShift = async (shiftId) => {
    return await Shift.findByIdAndDelete(shiftId);
};