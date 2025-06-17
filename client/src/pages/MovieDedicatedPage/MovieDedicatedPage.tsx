import { LoaderFunctionArgs, useLoaderData } from "react-router"
import { fetchMovieDetails } from "../../utils/fetchMediaDataWithAuth"
import { DetailedMovie, FavoriteMediaItem } from "../../types/Movies"
import "./MovieDedicatedPage.css"
import { useFavoritesContext } from "../../contexes/FavoritesContext"
import { useWatchListContext } from "../../contexes/WatchListContext"
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from "react-icons/fa"
import { formatRating } from "../../utils/formatRating"
import { defineRatingColor } from "../../utils/defineRatingColor"
import { format } from "date-fns"

export function MovieDeciatedPage() {
  const movie = useLoaderData<DetailedMovie>()
  const backgroundImageUrl = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
  const { favorites, toggleFavorite } = useFavoritesContext()
  const { watchList, toggleWatchList } = useWatchListContext()

  const favoriteMovie: FavoriteMediaItem= {
    title: movie.title,
    overview: movie.overview,
    tmdb_id: movie.id,
    vote_average: movie.vote_average,
    genre_ids: movie.genre_ids,
    release_date: movie.release_date,
    user_average: null,
    poster_path: movie.poster_path,
    media_type: 'movie'
  }
  const ratingColor = defineRatingColor(formatRating(movie.vote_average))
  const isFavorite = favorites.some((fav) => movie.id === fav.tmdb_id)
  const isWatchList = watchList.some((fav) => movie.id === fav.tmdb_id)

  function formatReleaseYear(date: string) {
    return date.slice(0, 4)
  }

  function formatRuntime(runtime: number) {
    const minutes = runtime % 60
    const hours = Math.floor(runtime / 60)
    return `${hours}h ${minutes}m`
  }

  const rawDate = movie.release_date
  const formattedFullDate = format(new Date(rawDate), "dd/MM/yyyy")

  return (
    <div className="movieDetails-wrapper">
      <img
        src={backgroundImageUrl}
        alt="Background"
        className="background-image"
      />
      <div className="background-overlay" />
      <img
        className="movieDetails-poster"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      />
      <div className="movieDetails-info">
        <div className="movie-highLevel-info">
          <div className="movie-title">
            {movie.title} <span>({formatReleaseYear(movie.release_date)})</span>
          </div>
          <div className="movie-subtitle">
            <div>
              {formattedFullDate} ({movie.origin_country[0]}) -
            </div>
            <div>{movie.genres.map((genre) => genre.name).join(", ")} -</div>
            <div className="movie-duration">{formatRuntime(movie.runtime)}</div>
          </div>
        </div>
        <div className="movie-buttons-info">
          <div className={`movie-rating ${ratingColor}`}>
            <span className="rating">{formatRating(movie.vote_average)}</span>
            <span className="percentageSymbol">%</span>
          </div>
          {isFavorite ? (
            <div
              className="movie-favorite"
              onClick={() => toggleFavorite(favoriteMovie)}
            >
              <FaHeart className="icon" />
            </div>
          ) : (
            <div
              className="movie-favorite"
              onClick={() => toggleFavorite(favoriteMovie)}
            >
              <FaRegHeart className="icon" />
            </div>
          )}

          {isWatchList ? (
            <div
              className="movie-watchList"
              onClick={() => toggleWatchList(favoriteMovie)}
            >
              <FaBookmark className="icon" />
            </div>
          ) : (
            <div
              className="movie-watchList"
              onClick={() => toggleWatchList(favoriteMovie)}
            >
              <FaRegBookmark className="icon" />
            </div>
          )}
        </div>
        <div className="movie-overview-info">
          <div className="movie-tagline">{movie.tagline}</div>
          <div className="movie-overview">
            <span>Overview:</span>
            <br />
            {movie.overview}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function MovieDedicatedPageLoader({
  request,
  params,
}: LoaderFunctionArgs) {
  const { movieId } = params

  if (!movieId) {
    throw new Response("Missing movie ID", { status: 400 })
  }

  const movieRes = await fetchMovieDetails(movieId, request.signal)
  if (!movieRes.ok) {
    throw new Response("Failed to fetch movie details", { status: 502 })
  }

  const movie = (await movieRes.json()) as DetailedMovie

  if (!movie.id) {
    throw new Response("Movie not found", { status: 404 })
  }

  return movie
}
