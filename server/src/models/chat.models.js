

import mongoose from "mongoose";


const chatSchema = new mongoose.Schema({
    onwer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    userMessage: [
        {
            type: String,
            trim: true,
            required: true
        },
    ],
    botMessage: [
        {
            type: String,
            required: true,
            trim: true
        }
    ]

}, { timestamps: true })

const Chat = mongoose.model("Chat", chatSchema)

export { Chat };