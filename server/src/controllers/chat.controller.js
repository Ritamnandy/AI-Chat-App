
import { Chat } from "../models/chat.models.js"

import { User } from "../models/user.models.js"

import { createNewChat, messageStream, generateImage } from "../utils/allaifetures.js"

import { ApiError } from "../utils/apierror.js"

import { ApiResponse } from "../utils/apiresponse.js"

import { asyncHandler } from "../utils/asynchandelar.js"


const messageWithAI = asyncHandler(async (req, res) => {
    const chatMessage = req.body.message;
    if (!chatMessage) {
        return res.status(400).json(new ApiError(400, "Bad request", ["Please provides message"]))
    }
    const userId = req.user?._id;
    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json(new ApiError(404, "User not found", ["User not found"]))
    }
    const chat = createNewChat();
    const aiResponse = await messageStream(chatMessage, chat);
    if (!aiResponse) {
        return res.status(500).json(new ApiError(500, "internal error", ["internal error"]))
    }
    const chat = await Chat.create({
        Onwer: userId,
        // title:
        Message: [
            {
                role: "user",
                text: chatMessage,
            },

            {
                role: "model",
                text: aiResponse,
            },
        ]
    })
    return res.status(200).json(new ApiResponse(200, "success ", { chat }))
})

const generateImageWithAI = asyncHandler(async (req, res) => {
    const prompt = req.body.prompt
    if (!prompt) {
        return res.status(400).json(new ApiResponse(400, "Bad Request", ["prompt is required"]))
    }
    const userId = req.user?._id;
    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json(new ApiError(404, "User not found", ["User not found"]))
    }
    const aiResponse = await generateImage(prompt);
    if (!aiResponse) {
        return res.status(500).json(new ApiError(500, "internal error", ["internal error"]))
    }
    const chat = await Chat.create({
        Onwer: userId,
        // title:
        Message: [
            {
                role: "user",
                text: prompt,
            },

            {
                role: "model",
                text: aiResponse,
            },
        ]
    })
    return res.status(200).json(new ApiResponse(200, "success ", { chat }))
})


export { messageStream, generateImageWithAI }