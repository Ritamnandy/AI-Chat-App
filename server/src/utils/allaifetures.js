

import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";

import * as fs from "node:fs";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })



const createNewChat = () => {

    return genAI.chats.create({

        model: "gemini-3-flash-preview",

        history: [
            {
                role: "user",
                parts: [{ text: "Hello" }],
            },

            {
                role: "model",
                parts: [
                    {
                        text: "Hi, how can I help you?",
                    },
                ],
            },
        ],
    });
};


const messageStream = async (message, chat) => {
    try {
        if (!message) {
            return null;
        }
        const stream = await chat.sendMessageStream({
            message: message,
        })
        let responseText = "";
        for await (const part of stream) {
            if (part.text) {
                responseText += part.text;
            }
        }
        // console.log("response from ai :- ", responseText);

        return responseText;
    } catch (error) {
        // console.error("Error in messageStream: ", error);
        return null;
    }
}

const imageUnderstanding = async (imagePath, message) => {
    try {
        const myFile = await genAI.files.upload({
            file: imagePath,
            config: { mimeType: "image/jpeg" },
        })
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: createUserContent([
                createPartFromUri(myFile.uri, myFile.mimeType),
                message,
            ]),
        });
        return response.text;
    } catch (error) {
        console.log("error in image understanding :- ", error);
        return null;
    }
}


const generateImage = async (prompt) => {
    if (!prompt) {
        return null;
    }
    const response = await genAI.models.generateContent({
        model: "gemini-3.1-flash-image-preview",
        contents: prompt,
    });
    for (const part of response.candidates[0].content.parts) {
        if (part.text) {
            return part.text;
            console.log(part.text);
        } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            return buffer;
            // fs.writeFileSync("gemini-native-image.png", buffer);
            // console.log("Image saved as gemini-native-image.png");
        }
    }
}

const editImage = async (imagePath, input) => {
    try {
        if (!imagePath && !input) {
            return null;
        }
        const imageData = fs.readFileSync(imagePath);
        const base64Image = imageData.toString("base64");
        const prompt = [
            {
                text: input
            },
            {
                inlineData: {
                    mimeType: "image/png",
                    data: base64Image,
                },
            },
        ];
        const response = await genAI.models.generateContent({
            model: "gemini-3.1-flash-image-preview",
            contents: prompt,
        })
        for (const part of response.candidates[0].content.parts) {
            if (part.text) {
                console.log(part.text);
                return part.text;
            } else if (part.inlineData) {
                const imageData = part.inlineData.data;
                const buffer = Buffer.from(imageData, "base64");
                return buffer;
                // fs.writeFileSync("gemini-native-image.png", buffer);
                // console.log("Image saved as gemini-native-image.png");
            }
        }

    } catch (error) {

    }
}



export {
    messageStream,
    createNewChat,
    // imageUnderstanding,
    generateImage,
    // editImage
}