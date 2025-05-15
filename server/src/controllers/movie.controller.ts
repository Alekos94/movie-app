import { Movie } from "../types/movie"
import { Request, Response } from "express"
import { Users } from "../models/user.model"



export async function getUserFavorites (request:Request, response:Response):Promise<void> {
  try {
    if (request.user) {
      const {favoriteMovies} = request.user
      response.status(200).json(favoriteMovies)
    } else {
      response.status(401).json({ error: "Unauthorized" });
    }
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: "Something went wrong" });
  }
}

export async function addFavoriteMovie(request: Request<{}, {}, Movie>, response:Response):Promise<void> {
  try {
    if (request.user) {
      const {_id} = request.user
      const {title,overview,tmdb_id,vote_average,genre_ids,release_date,user_average,poster_path} = request.body
      const updatedUser = await Users.findOneAndUpdate({_id}, {$push: {favoriteMovies: {title,overview,tmdb_id,vote_average,genre_ids,release_date,user_average,poster_path}}}, {new:true})
      response.status(201).json(updatedUser)
    } else {
      response.status(401).json({ error: "Unauthorized" });
    }
  } catch (err) {
    console.error(err);
    response.status(500).send({ error: "Something went wrong" })
  }
}


export async function removeFavoriteMovie(request: Request<{}, {}, Movie>, response:Response):Promise<void> {
  try {
    if (request.user) {
      const {_id} = request.user
      const {tmdb_id} = request.body
      console.log(tmdb_id)
      const removedMovie = await Users.findOneAndUpdate({_id}, {$pull: {favoriteMovies: {tmdb_id}}}, {new:true})
      response.status(201).json(removedMovie)
    } else {
      response.status(401).json({ error: "Unauthorized" });
    }
  } catch (err) {
    console.error(err);
    response.status(500).send({ error: "Something went wrong" })
  }
}