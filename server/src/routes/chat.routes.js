

import express from "express"
import { verifyJWT } from "../middlewares/auth.middlewares.js"
import { messageWithAI, generateImageWithAI } from "../controllers/chat.controller.js"


const router = express.Router()

router.route('/chatwithai').post(verifyJWT, messageWithAI)
router.route('/createimage').post(verifyJWT, generateImageWithAI)


export default router