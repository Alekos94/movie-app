import { Router } from "express";
import {addFavoriteMovie, addWatchListMovie, getUserFavorites, getUserWatchList, removeFavoriteMovie, removeWatchListMovie} from "../controllers/movie.controller";
import { authenticateToken } from "../middlewares/authenticateToke.middleware";

export const movieRouter = Router()

//favorite movies routes
movieRouter.get('/favorites', authenticateToken, getUserFavorites)
movieRouter.post('/favorites', authenticateToken, addFavoriteMovie)
movieRouter.delete('/favorites', authenticateToken, removeFavoriteMovie)
//watchlist movies routes 
movieRouter.get('/watchlist', authenticateToken, getUserWatchList)
movieRouter.post('/watchlist', authenticateToken, addWatchListMovie)
movieRouter.delete('/watchlist', authenticateToken, removeWatchListMovie)


