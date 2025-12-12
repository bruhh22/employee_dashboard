const Employee = require('../models/Employee');

exports.getAllEmployees = async () => {
    return await Employee.find({});
};