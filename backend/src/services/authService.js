const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const ErrorResponse = require('../utils/errorResponse');

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new ErrorResponse('Invalid credentials', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new ErrorResponse('Invalid credentials', 401);
    }

    const token = generateToken(user._id, user.role, user.email);
    return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};