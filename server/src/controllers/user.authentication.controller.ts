import { Users } from "../models/user.model"
import { Request, Response } from "express"
import { LoginUser, RegisterUser, User } from "../types/user"
import bcrypt from "bcryptjs"

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
    return response.status(201).json(newUser)
  } catch (error: any) {
    return response.status(400).json({ error: error.message })
  }
}

export async function loginUser(
  request: Request<{}, {}, LoginUser>,
  response: Response
) {
  try {
    const { email, password } = request.body
    const user = await Users.findOne({ email: email }).lean<User>()

    if (!user) {
      return response.status(400).json({ error: "Invalid email" })
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return response.status(400).json({ error: "Invalid password" })
    }
    return response.status(200).json({ message: "Logged in successfully" })
  } catch (error: any) {
    console.error(error)
    return response.status(500).json({ error: "Internal server error" })
  }
}
