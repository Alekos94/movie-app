import { Request, Response, NextFunction } from "express"
import { User } from "../types/user"
import jwt from "jsonwebtoken"
import { Users } from "../models/user.model"
import express from "express"
// further explore module augmentation
declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, "password">
    }
  }
}

export async function authenticateToken(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const token = request.cookies.jwt
  if (!token) {
    response.status(401).json({ error: "Authentication required" })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)

    if (typeof decoded === "object" && decoded !== null) {
      const user = await Users.findById(decoded.id)
        .select("name surname email favoriteMovies watchList lists")
        .lean()

      if (!user) {
        response.status(401).json({ error: "User not found" })
        return
      }

      // Attach the user (without password) to the request object
      request.user = user as Omit<User, "password">
      // Continue to the next middleware or route handler
      next()
    }
  } catch (err) {
    response.status(401).json({ error: "Invalid or expired token" })
    return
  }
}
