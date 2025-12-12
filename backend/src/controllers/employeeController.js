const employeeService = require('../services/employeeService');

exports.getEmployees = async (req, res, next) => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.status(200).json({ success: true, count: employees.length, data: employees });
    } catch (error) {
        next(error);
    }
};