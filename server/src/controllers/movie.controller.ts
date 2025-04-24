import { Favorites } from "../models/movies.model"
import { Movie } from "../types/movie"
import { Request, Response } from "express"


export async function getFavorites(request:Request, response:Response):Promise<void> {
  try {
    const favorites = await Favorites.find()
    response.status(200).send(favorites)
  } catch (e) {
    console.error(e);
    response.status(500).json({ error: "Something went wrong" });
  }
}

export async function addFavorite(request: Request<{}, {}, Movie>, response: Response): Promise<void> {
  try {
    const {title,overview,tmdb_id,vote_average,genre_ids,release_date,user_average} = request.body
    const newFavorite = await Favorites.create({title,overview,tmdb_id,vote_average,genre_ids,release_date,user_average, isFavorite: true})
    response.status(201).json(newFavorite)
  } catch (e) {
    console.log(e)
    response.status(500).send({ error: "Something went wrong" })
  }
}

export async function removeFavorite(request:Request, response:Response): Promise<void> {
  try {
    const id: string = request.body.id
    const deletedFavorite = await Favorites.findByIdAndDelete(id)
    response.status(200).send(`${deletedFavorite} was deleted succesfully`)
  } catch (e) {
    console.log(e)
    response.status(500).send({ error: "Something went wrong" })
  }
}

