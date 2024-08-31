import { Router } from "express"
import { getUserInfo, logIn, signUp, updateProfile } from "../controllers/authController.js"
import { verifyToken } from "../middlewares/authMiddleware.js";

const authRoutes = Router()

authRoutes.post("/signup", signUp);
authRoutes.post("/login", logIn);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);

export default authRoutes;