

import jwt from 'jsonwebtoken';
import { User } from '../models/user.models.js';

import { asyncHandler } from '../utils/asynchandelar.js';
import { ApiError } from '../utils/apierror.js';

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer", "")
        if (!token) {
            return res.status(401).json(new ApiError(401, "Unauthorized", ["No token provided"]))
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded._id).select("-password -refreshToken");
        if (!user) {
            return res.status(401).json(new ApiError(401, "Unauthorized", ["Invalid token"]))
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("middleware error", error);
        return res.status(401).json(new ApiError(401, "Unauthorized", ["Invalid token"]))
    }

})


export { verifyJWT }