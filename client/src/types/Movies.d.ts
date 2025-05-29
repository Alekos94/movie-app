export type GeneralMovie = {
  title: string
  overview: string
  id: number
  vote_average: number
  genre_ids: number[]
  release_date: string
  poster_path: string
  overview: string
}

export type GeneralMediaType = {
  title?: string
  name?: string
  overview: string
  id: number
  vote_average: number
  genre_ids: number[]
  release_date: string
  poster_path: string
  overview: string
  media_type?: string
  category: string
}

export type SearchPageTvShowType = {
  id: number
  name: string
  original_name: string
  first_air_date: string
  overview: string
  poster_path: string
}

export type SearchPagePersonType = {
  id:number 
  name: string
  known_for_department: string
  profile_path: string
  known_for: {title?: string
    name?: string
  }[]
}

export type DetailedMovie = GeneralMovie & {origin_country: string[]
  genres: {id:number, name: string}[]
  original_language: string
  overview: string
  runtime: number
  backdrop_path: string
  tagline: string
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


