

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

    role: {
        type: String,
        enum: ["user", "model"],
        required: true,
    },

    text: {
        type: String,
        required: true,
        trim: true,
    },

}, { _id: false });

const chatSchema = new mongoose.Schema({
    Onwer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    title: {
        type: String,

        default: "New Chat",
    },
    Message: [messageSchema],


}, { timestamps: true })

const Chat = mongoose.model("Chat", chatSchema)

export { Chat };