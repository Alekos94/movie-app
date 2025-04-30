import { Users } from "../models/user.model"
import { Request, Response } from "express"
import { LoginUser, RegisterUser, User } from "../types/user"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
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
    //only include non-sensitive data in the token payload
    const accessToken = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.ACCESS_TOKEN_SECRET!
    )
    //never include in a response a hashed password 
    const { password: _password, ...userWithoutPassword } = newUser.toObject()
    response.status(201).json({ user: userWithoutPassword,  token: accessToken })
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
    } else {
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        response.status(400).json({ error: "Invalid password" })
        return
      }
      const accessToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET!
      )
      const { password: _password, ...userWithoutPassword } = user.toObject()
      response.status(200).json({ user: userWithoutPassword, token: accessToken })
    }
  } catch (error: any) {
    console.error(error)
    response.status(500).json({ error: "Internal server error" })
  }
}
