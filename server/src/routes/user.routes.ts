import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.authentication.controller";
import { authenticateToken } from "../middlewares/authenticateToke.middleware";
import { getUser } from "../controllers/user.controller";

export const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/user', authenticateToken, getUser )