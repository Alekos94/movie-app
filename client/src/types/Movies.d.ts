export type GeneralMovie = {
  title: string
  overview: string
  id: number
  vote_average: number
  genre_ids: number[]
  release_date: string
  poster_path: string
}

export type MovieDetails = GeneralMovie & {origin_country: string[]
  genres: {id:number, name: string}[]
  original_language: string
  overview: string
  runtime: number
  backdrop_path: string
}

export type FavoriteMovie = {
  title: string
  overview: string
  tmdb_id: number
  vote_average: number
  genre_ids: number[]
  release_date: string
  user_average: number | null
  poster_path: string
}

export type HomePageLoaderData = {
  topRatedMoviesList: GeneralMovie[];
  popularMoviesList: GeneralMovie[];
  upcomingMoviesList: GeneralMovie[];
}

// type List = {
//   name: string
//   movies: FavoriteMovie[]
// }

// export type User = {
//   _id: string
//   name: string
//   surname: string
//   email: string
// }

