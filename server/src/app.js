
import express from "express"

import cors from "cors"

import cookiesParser from "cookie-parser"


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookiesParser())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.static("public"))

//import routes

import authRoutes from "./routes/user.routes.js"
import chatRoutes from "./routes/chat.routes.js"


app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/chat", chatRoutes)



export { app }