
const jwt = require('jsonwebtoken');
const { sendErrorResponse } = require('../utils/serverMessage');

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return sendErrorResponse(res, 401, 'No token, authorization denied');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'mysecrettoken');
        req.user = decoded.user;
        next();
    } catch (err) {
        return sendErrorResponse(res, 401, 'Token is not valid');
    }
};

module.exports = auth;
