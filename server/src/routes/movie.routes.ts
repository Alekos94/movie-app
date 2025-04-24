import { Router } from "express";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/movie.controller";


export const movieRouter = Router()

movieRouter.post('/favorites', addFavorite)
movieRouter.get('/favorites', getFavorites)
movieRouter.delete('/favorites', removeFavorite)

