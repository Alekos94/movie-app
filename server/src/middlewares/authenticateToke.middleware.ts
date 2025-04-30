import { Request, Response, NextFunction } from "express"
import { User } from "../types/user";
import jwt from "jsonwebtoken"
import express from 'express';
// further explore module augmentation
declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export function authenticateToken (request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if (!token) {
    return response.status(401).json('A token is missing')
  }
  try {
    //jwt.verify can return string | JwtPayload if the token was created with an object| undefined
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
  
    if (typeof decoded === 'object' && decoded !== null) {
      request.user = decoded as User;
      next();
    } else {
      return response.status(403).json('Invalid token payload');
    }
  } catch (err) {
    return response.status(403).json('Forbidden token');
  }
}