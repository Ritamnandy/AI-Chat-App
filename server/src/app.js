
import express, { urlencoded } from "express"

import cors from "cors"

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.static("public"))

//import routes

import authRoutes from "./routes/user.routes.js"


app.use("/api/v1/auth", authRoutes)



export { app }