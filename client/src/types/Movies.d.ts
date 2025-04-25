export type GeneralMovie = {
  title: string
  overview: string
  id: number
  vote_average: number
  genre_ids: number[]
  release_date: string
  poster_path: string
}

export type HomePageLoaderData = {
  topRatedMoviesList: GeneralMovie[];
  popularMoviesList: GeneralMovie[];
  upcomingMoviesList: GeneralMovie[];
}

