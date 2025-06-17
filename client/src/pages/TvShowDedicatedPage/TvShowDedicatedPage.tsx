import { LoaderFunctionArgs, useLoaderData} from "react-router"
import { fetchTvShowDetails } from "../../utils/fetchMediaDataWithAuth"
import { DetailedTvShow, FavoriteMediaItem } from "../../types/Movies"
import { defineRatingColor } from "../../utils/defineRatingColor"
import { formatRating } from "../../utils/formatRating"
import { format } from "date-fns"
import { useFavoritesContext } from "../../contexes/FavoritesContext"
import { useWatchListContext } from "../../contexes/WatchListContext"
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from "react-icons/fa"

export function TvShowDedicatedPage () {
  const tvShow = useLoaderData<DetailedTvShow>()
  console.log(tvShow)
  const backgroundImageUrl = `https://image.tmdb.org/t/p/w1280${tvShow.backdrop_path}`
  const {favorites, toggleFavorite} = useFavoritesContext()
  const {watchList, toggleWatchList} = useWatchListContext()

  const favoriteTvShow : FavoriteMediaItem = {
    title: tvShow.name,
    overview: tvShow.overview,
    tmdb_id: tvShow.id,
    vote_average: tvShow.vote_average,
    genre_ids: tvShow.genre_ids,
    release_date: tvShow.first_air_date,
    user_average: null,
    poster_path: tvShow.poster_path,
    media_type: 'tvShow'
  }

  const ratingColor = defineRatingColor(formatRating(tvShow.vote_average))
  const isFavorite = favorites.some((fav) => tvShow.id === fav.tmdb_id)
  const isWatchList = watchList.some((fav) => tvShow.id === fav.tmdb_id)


  function formatReleaseYear(date: string) {
    return date.slice(0, 4)
  }

  const rawDate = tvShow.first_air_date
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
            src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
          />
          <div className="movieDetails-info">
            <div className="movie-highLevel-info">
              <div className="movie-title">
                {tvShow.name} <span>({formatReleaseYear(tvShow.first_air_date)})</span>
              </div>
              <div className="movie-subtitle">
                <div>
                  {formattedFullDate} ({tvShow.origin_country[0]}) -
                </div>
                <div>{tvShow.genres.map((genre) => genre.name).join(", ")} -</div>
                <div className="movie-duration">{tvShow.seasons.length} Seasons ({tvShow.status})</div>
              </div>
            </div>
            <div className="movie-buttons-info">
              <div className={`movie-rating ${ratingColor}`}>
                <span className="rating">{formatRating(tvShow.vote_average)}</span>
                <span className="percentageSymbol">%</span>
              </div>
              {isFavorite ? (
                <div
                  className="movie-favorite"
                  onClick={() => toggleFavorite(favoriteTvShow)}
                >
                  <FaHeart className="icon" />
                </div>
              ) : (
                <div
                  className="movie-favorite"
                  onClick={() => toggleFavorite(favoriteTvShow)}
                >
                  <FaRegHeart className="icon" />
                </div>
              )}
    
              {isWatchList ? (
                <div
                  className="movie-watchList"
                  onClick={() => toggleWatchList(favoriteTvShow)}
                >
                  <FaBookmark className="icon" />
                </div>
              ) : (
                <div
                  className="movie-watchList"
                  onClick={() => toggleWatchList(favoriteTvShow)}
                >
                  <FaRegBookmark className="icon" />
                </div>
              )}
            </div>
            <div className="movie-overview-info">
              <div className="movie-tagline">{tvShow.tagline}</div>
              <div className="movie-overview">
                <span>Overview:</span>
                <br />
                {tvShow.overview}
              </div>
            </div>
          </div>
        </div>
  )
}

export async function TvShowDedicatedPageLoader({request, params}: LoaderFunctionArgs) {
  const {tvShowId} = params
  
  if (!tvShowId) {
      throw new Response("Missing tvShow ID", { status: 400 })
    }
  
    const tvShowRes = await fetchTvShowDetails(tvShowId, request.signal)
    if (!tvShowRes.ok) {
      throw new Response("Failed to fetch tvShow details", { status: 502 })
    }
  
    const tvShow = await tvShowRes.json() as DetailedTvShow

    if (!tvShow.id) {
      throw new Response("TvShow not found", { status: 404 })
    }

    return tvShow
}
