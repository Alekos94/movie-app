import { Router } from "express";
import {addFavoriteMovie, getUserFavorites, removeFavoriteMovie} from "../controllers/movie.controller";
import { authenticateToken } from "../middlewares/authenticateToke.middleware";

export const movieRouter = Router()


movieRouter.get('/favorites', authenticateToken, getUserFavorites)
movieRouter.post('/favorites', authenticateToken, addFavoriteMovie)
movieRouter.delete('/favorites', authenticateToken, removeFavoriteMovie)


