

import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

import { asyncHandler } from '../utils/asynchandelar.js';
import { ApiError } from '../utils/apierror.js';

const verifyToken = asyncHandler(async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer", "")
        if (!token) {
            return res.status(401).json(new ApiError(401, "Unauthorized", ["No token provided"]))
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json(new ApiError(401, "Unauthorized", ["Invalid token"]))
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json(new ApiError(401, "Unauthorized", ["Invalid token"]))
    }

})