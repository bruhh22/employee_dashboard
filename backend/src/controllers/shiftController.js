const shiftService = require('../services/shiftService');

exports.createShift = async (req, res, next) => {
    try {
        const shift = await shiftService.createShift(req.body);
        res.status(201).json({ success: true, data: shift });
    } catch (error) {
        next(error);
    }
};

exports.getShifts = async (req, res, next) => {
    try {
        const shifts = await shiftService.getShifts(req.user, req.query);
        res.status(200).json({ success: true, count: shifts.length, data: shifts });
    } catch (error) {
        next(error);
    }
};

exports.deleteShift = async (req, res, next) => {
    try {
        await shiftService.deleteShift(req.params.id);
        res.status(200).json({ success: true, message: 'Shift removed' });
    } catch (error) {
        next(error);
    }
};