
import express from 'express';

import {
    registerUser, loginUser,
    logoutUser, refreshAccessToken,
    changeCurrentPassword, setAvatar,
    getCurrentUserDetails
} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"
import { upload } from "../middlewares/multer.middlewares.js"
const router = express.Router();


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/refreshaccesstoken").post(refreshAccessToken)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/changepassword").post(verifyJWT, changeCurrentPassword)
router.route("/changeavatar").post(verifyJWT, upload.single('avatar'), setAvatar)


//get recurrent user details
router.route("/me").get(verifyJWT, getCurrentUserDetails)

export default router;