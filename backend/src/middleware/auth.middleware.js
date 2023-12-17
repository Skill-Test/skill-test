const HttpException = require('../utils/HttpException.utils');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = (...roles) => {
    return async function (req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';

            if (!authHeader || !authHeader.startsWith(bearer)) {
                 // Change: Use throw to handle errors
                throw new HttpException(401, 'Access denied. No credentials sent!');
            }

            const token = authHeader.replace(bearer, '');
            const secretKey = process.env.SECRET_JWT || "";

            // Change: Use async/await to handle asynchronous operations
            const decoded = jwt.verify(token, secretKey);
            const user = await UserModel.findOne({ id: decoded.user_id });

            if (!user) {
                 // Override: Use throw to handle errors
                throw new HttpException(401, 'Authentication failed!');
            }

            // Change: Separate authorization logic
            const ownerAuthorized = req.params.id == user.id;
            const roleAuthorized = roles.length === 0 || roles.includes(user.role);

            if (!ownerAuthorized && !roleAuthorized) {
                 // Override: Use throw to handle errors
                throw new HttpException(403, 'Unauthorized');
            }

             // Change: Store authenticated user in req.currentUser
            req.currentUser = user;
            next();
        } catch (error) {
            // Swap: Pass error to the next error handling middleware
            next(error);
        }
    };
};

module.exports = auth;
