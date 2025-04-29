import { Movie } from "./movie";

type List = {
  name: string
  movies: Movie[]
}

export type User = {
  name: string
  surname: string
  email: string
  password: string
  favoriteMovies: Movie[]
  watchList: Movie[]
  lists: List[]
}

export type RegisterUser = Omit<User, 'favoriteMovies' | 'watchList' | 'lists'>

export type LoginUser = Pick<User, 'email' | 'password'>