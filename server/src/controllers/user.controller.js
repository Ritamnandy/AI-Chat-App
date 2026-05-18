

import { User } from '../models/user.models.js';
import { ApiError } from '../utils/apierror.js'
import { ApiResponse } from '../utils/apiresponse.js'
import { asyncHandler } from '../utils/asynchandelar.js'
// import { sendEmail } from '../utils/email.util.js';


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
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json(new ApiError(400, "Bad request", ["Please provide firstname,lastname, email and password"]));
    }
    if (firstName === "" || lastName === "" || email === "" || password === "") {
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
    if (!email || !password) {
        return res.status(400).json(new ApiError(400, "Bad request", ["Please provide email and password"]));
    }
    if (email === "" || password === "") {
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
const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
})

