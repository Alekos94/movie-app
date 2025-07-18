import { Users } from "../models/user.model"
import { Request, Response } from "express"
import { LoginUser, RegisterUser, User } from "../types/user"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import cookieParser = require("cookie-parser")
dotenv.config()

export async function registerUser(
  request: Request<{}, {}, RegisterUser>,
  response: Response
) {
  try {
    const { name, surname, email, password } = request.body
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = await Users.create({
      name,
      surname,
      email,
      password: passwordHash,
    })
    const accessToken = jwt.sign(
      { id: newUser._id, email: newUser.email},
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "30m" }
    )
    response.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: 30 * 1000 * 60,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    response.status(201).json({ id: newUser._id, email: newUser.email, name: newUser.name})
  } catch (error: any) {
    response.status(400).json({ error: error.message })
  }
}

export async function loginUser(
  request: Request<{}, {}, LoginUser>,
  response: Response
) {
  try {
    const { email, password } = request.body
    const user = await Users.findOne({ email: email })
    if (!user) {
      response.status(400).json({ error: "Invalid email" })
      return
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      response.status(400).json({ error: "Invalid password" })
      return
    }
    const accessToken = jwt.sign(
      { id: user._id, email: email},
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "30m" }
    )
    response.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: 30 * 1000 * 60,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    response.status(200).json({ id: user._id, email: email, name: user.name })
  } catch (error: any) {
    console.error(error)
    response.status(500).json({ error: "Internal server error" })
  }
}

export async function logoutUser(request: Request, response: Response) {
  response.cookie("jwt", "", {
    httpOnly: true,
    maxAge: 0, 
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })
  response.status(200).json({ message: "Logged out successfully" })
}
