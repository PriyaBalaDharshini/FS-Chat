import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;
const dbUrl = process.env.DB_URL;
const origin = process.env.ORIGIN

app.use(
    cors({
        origin: [origin],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true
    })
)

//a Middleware
app.use(cookieParser()) //For gettin the cookies from frontend
app.use(express.json()) //To have a body on json formate

app.use("/auth", authRoutes)


mongoose
    .connect(dbUrl)
    .then(() => console.log("DB Connection successfull"))
    .catch((error) => console.log(error.message));

app.listen(PORT, () => { console.log(`Server running on ${PORT}`) })