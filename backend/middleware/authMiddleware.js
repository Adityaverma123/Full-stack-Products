const jwt = require('jsonwebtoken');
const userService = require('../services/userService')
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Authorization header missing' });
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const userResult = await userService.getUserDetails(verified.id)
        req.user = userResult;
        next();
    } catch (error) {
        console.log("Error occured while validating token", token)
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        const status = error.statusCode || 400;
        const message = error.statusCode === 404 ? 'User not found' : 'Invalid token';
        res.status(status).json({ message: message });
    }
};

module.exports = authMiddleware;
