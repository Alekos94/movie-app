export type Movie = {
  title: string
  overview: string
  tmdb_id: number
  vote_average: number
  genre_ids: number[]
  release_date: string
  user_average: number | null
  poster_path: string
  media_type: string
}