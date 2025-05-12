import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.authentication.controller";
import { authenticateToken } from "../middlewares/authenticateToke.middleware";
import { getUser } from "../controllers/user.controller";

export const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', logoutUser)
userRouter.get('/user', authenticateToken, getUser )