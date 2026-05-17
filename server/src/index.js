
import dotenv from "dotenv";

import { GoogleGenAI, ThinkingLevel } from "@google/genai";

dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const chatWithGemini = async (input) => {
    try {
        const response = await genAI.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: input,
            config: {
                thinkingConfig: {
                    thinkingLevel: ThinkingLevel.HIGH,
                },
            }
        })
        console.log("Response :-  ,", response.text);
    } catch (error) {
        console.log("Error:- ", error);

    }

}


chatWithGemini("Is AI take job?")