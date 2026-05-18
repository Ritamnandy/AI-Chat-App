

import { User } from '../models/user.models.js';
import { ApiError } from '../utils/apierror.js'
import { ApiResponse } from '../utils/apiresponse.js'
import { asyncHandler } from '../utils/asynchandelar.js'
import { uploadCloudinary } from "../utils/uploadcloudinary.js"
import jwt from 'jsonwebtoken';



const generateAccessAndRefreshToken = async (userId) => {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
}


// Create a new user
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName && !lastName && !email && !password) {
        return res.status(400).json(new ApiError(400, "Bad request", ["Please provide firstname,lastname, email and password"]));
    }
    if (firstName === "" && lastName === "" && email === "" && password === "") {
        return res.status(400).json(new ApiError(400, "Bad request", ["firstname,lastname, email and password cannot be empty"]));
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.status(400).json(new ApiError(400, "Bad request", ["User already exists"]));
    }
    // Create new user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password
    });
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    return res.status(201).json(new ApiResponse(201, "User created successfully", { user: createdUser, accessT: accessToken, refreshT: refreshToken }));
})


// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email && !password) {
        return res.status(400).json(new ApiError(400, "Bad request", ["Please provide email and password"]));
    }
    if (email === "" && password === "") {
        return res.status(400).json(new ApiError(400, "Bad request", ["email and password cannot be empty"]));
    }
    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json(new ApiError(400, "Bad request", ["Invalid  email"]));
    }
    const isPassword = awaituser.isPasswordMatch(password)
    if (!isPassword) {
        return res.status(400).json(new ApiError(400, "Bad request", ["Invalid  password"]));
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    return res.status(200).json(new ApiResponse(200, "User logged in successfully", { user: loggedInUser, accessT: accessToken, refreshT: refreshToken }));
})

//logout user
const logoutUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    if (!userId) {
        return res.status(401).json(new ApiError(401, "Unauthorized", ["User not authenticated"]));
    }
    const user = await User.findByIdAndUpdate(userId, {
        $set: {
            refreshToken: " "
        }
    }, { returnDocument: "after" })
    return res.status(200).json(new ApiResponse(200, "User logged out successfully", {}));
})

// Change password
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword && !newPassword) {
        return res.status(400).json(new ApiError(400, "Bad request", ["Please provide old password and new password"]));
    }
    if (oldPassword === "" && newPassword === "") {
        return res.status(400).json(new ApiError(400, "Bad request", ["old password and new password cannot be empty"]));
    }
    const userId = req.user?._id;
    const user = await User.findById(userId)
    if (!user) {
        return res.status(401).json(new ApiError(401, "Unauthorized", ["User not authenticated"]));
    }
    const isPassword = await user.isPasswordMatch(oldPassword)
    if (!isPassword) {
        return res.status(400).json(new ApiError(400, "Bad request", ["Invalid old password"]));
    }
    user.password = newPassword
    await user.save({ validateBeforeSave: false })
    return res.status(200).json(new ApiResponse(200, "Password changed successfully", {}));
})


const setAvatar = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id)
    if (!user) {
        return res.status(401).json(new ApiError(401, "Unauthorized", ["User not authenticated"]));
    }
    const filePath = req.file?.path;
    if (!filePath) {
        return res.status(400).json(new ApiError(400, "Bad request", ["Please provide an image"]));
    }
    const cloudinaryUrl = await uploadCloudinary(filePath)
    if (!cloudinaryUrl) {
        return res.status(500).json(new ApiError(500, "Internal server error", ["Failed to upload image"]));
    }
    user.avatar = cloudinaryUrl.url;
    await user.save({ validateBeforeSave: false })
    return res.status(200).json(new ApiResponse(200, "Avatar set successfully", { avatar: cloudinaryUrl.url }));
})

//refreshAccesstoken
const refreshAccessToken = asyncHandler(async (req, res) => {
    const inComingRefreshToken = req.body.refreshToken;
    if (!inComingRefreshToken) {
        return res.status(400).json(new ApiError(400, "Bad request", ["Please provide refresh token"]));
    }
    const decodeToken = jwt.verify(inComingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decodeToken?._id);
    if (!user) {
        return res.status(400).json(new ApiError(400, "Bad Request", ["Invalid refresh token"]));
    }
    if (inComingRefreshToken !== user.refreshToken) {
        return res.status(400).json(new ApiError(400, "Bad Request", ["Invalid refresh token"]));
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    return res.status(200).json(new ApiResponse(200, "Access token refreshed successfully", { accessT: accessToken, refreshT: refreshToken }));
})

//get corrent user details
const getCurrentUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id).select("-password -refreshToken")
    if (!user) {
        return res.status(401).json(new ApiError(401, "Unauthorized", ["User not authenticated"]));
    }
    return res.status(200).json(new ApiResponse(200, "User details fetched successfully", { user }));
})



export {
    registerUser, loginUser,
    logoutUser, changeCurrentPassword,
    setAvatar, refreshAccessToken,
    getCurrentUserDetails
}