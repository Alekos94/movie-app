import { Request, Response, NextFunction } from "express"
import { User } from "../types/user";
import jwt from "jsonwebtoken"
import { Users } from "../models/user.model";
import express from 'express';
// further explore module augmentation
declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, 'password'>
    }
  }
}

export async function authenticateToken (request: Request, response: Response, next: NextFunction) {
  const token = request.cookies.jwt

  if (!token) {
    return response.status(401).json({error: 'Authentication required'})
  }
  try {
    //jwt.verify can return string | JwtPayload if the token was created with an object| undefined
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
  
    if (typeof decoded === 'object' && decoded !== null) {
      const user = await Users.findById(decoded.id).select('name surname email favoriteMovies watchList lists').lean();
      
      if (!user) {
        return response.status(401).json({ error: 'User not found' });
      }
      
      request.user = user as Omit<User, 'password'>
      next();
    } 
  } catch (err) {
    return response.status(401).json({error: 'Invalid or expired token'});
  }
}