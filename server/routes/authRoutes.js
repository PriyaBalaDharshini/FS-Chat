import { Router } from "express"
import { logIn, signUp } from "../controllers/authController.js"

const authRoutes = Router()

authRoutes.post("/signup", signUp);
authRoutes.post("/login", logIn);

export default authRoutes;