// jwt.utils.js
import jwt from 'jsonwebtoken';


/**
 * Sign payload into JWT token
 * @param {Object} payload - Data to encode in the token
 * @returns {string} JWT token
 */
export const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET);
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object|null} Decoded payload or null if invalid
 */
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
};

