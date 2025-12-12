const authService = require('../services/authService');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        const data = await authService.loginUser(email, password);

        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
};