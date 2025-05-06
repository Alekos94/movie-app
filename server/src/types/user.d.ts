import { Movie } from "./movie"
import { Types } from "mongoose";

type List = {
  name: string
  movies: Movie[]
}

export type User = {
  _id: Types.ObjectId
  name: string
  surname: string
  email: string
  password: string
  favoriteMovies: Movie[]
  watchList: Movie[]
  lists: List[]
}

export type RegisterUser = Omit<User, "favoriteMovies" | "watchList" | "lists">

export type LoginUser = Pick<User, "email" | "password">
