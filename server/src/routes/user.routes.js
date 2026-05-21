
import express from 'express';

import {
    registerUser, loginUser,
    logoutUser, refreshAccessToken,
    changeCurrentPassword, setAvatar,
    getCurrentUserDetails, getAllChat
} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"
import { upload } from "../middlewares/multer.middlewares.js"
const router = express.Router();


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/refreshaccesstoken").post(refreshAccessToken)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/changepassword").post(verifyJWT, changeCurrentPassword)
router.route("/avatar").post(verifyJWT, upload.single('avatar'), setAvatar)


//get recurrent user details
router.route("/me").get(verifyJWT, getCurrentUserDetails)
router.route("/allchats").get(verifyJWT, getAllChat)

export default router;