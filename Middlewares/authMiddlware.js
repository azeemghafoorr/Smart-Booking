// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const {secretKey} = require("../config");

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }
    try {
        req.user = jwt.verify(token, secretKey);
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateToken;
