import { Request, Response } from "express"
import { User } from "../types/user";

export  function getUser (request: Request, response: Response) {
  if (!request.user) {
   response.status(401).json({ error: 'User not authenticated' });
   return
  }

 response.status(200).json(request.user)
 return
}