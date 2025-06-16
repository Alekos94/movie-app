import { useNavigate } from "react-router"
import { GeneralTvShow, FavoriteMediaItem} from "../../types/Movies"
import { defineRatingColor } from "../../utils/defineRatingColor"
import { formatRating } from "../../utils/formatRating"
import { useFavoritesContext } from "../../contexes/FavoritesContext"
import { useWatchListContext } from "../../contexes/WatchListContext"
import { useUserContext } from "../../contexes/UserContext"
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from "react-icons/fa"
import { HiOutlinePhoto } from "react-icons/hi2";
export function HomePageTvShow({
  name,
  poster_path,
  vote_average,
  first_air_date,
  id,
  overview,
  genre_ids,
}: GeneralTvShow) {
  const ratingColor = defineRatingColor(formatRating(vote_average))
  const navigate = useNavigate()
  const {favorites, toggleFavorite} = useFavoritesContext()
  const {watchList, toggleWatchList} = useWatchListContext()
  const {user} = useUserContext()

  const tvShow : FavoriteMediaItem = {
    title: name,
    overview: overview,
    tmdb_id: id,
    vote_average: vote_average,
    genre_ids: genre_ids,
    release_date: first_air_date,
    user_average: null,
    poster_path: poster_path,
    media_type: 'tvShow'
  }
  const isFavorite = favorites.some((favorite) => favorite.tmdb_id === id)
  const isWatchList = watchList.some(
    (watchListMovie) => watchListMovie.tmdb_id === id
  )
return (
  <div className="homePage-movie-wrapper">
        <div className="movieContainer">
          <div className="moviePoster">
            {poster_path ? <img
              onClick={() => navigate(`movie/${id}`)}
              src={`https://image.tmdb.org/t/p/w185${poster_path}`}
            /> : <div onClick={() => navigate(`/movie/${id}`)} className="missingPoster"><HiOutlinePhoto className="missingPoster-icon"/></div>}}
  
            <div className={`movieRating ${ratingColor}`}>
              <span className="rating">{formatRating(vote_average)}</span>
              <span className="percentageSymbol">%</span>
            </div>
          </div>
          <div onClick={() => navigate(`movie/${id}`)} className="movieTitle">
            {name}
          </div>
          <div className="movieReleaseDate">{first_air_date}</div>
          <div className="icons">
            {user &&
              (isFavorite ? (
                <div
                  className="favorite-icon-wrapper"
                  onClick={() => toggleFavorite(tvShow)}
                >
                  <FaHeart className="heart-icon" />
                </div>
              ) : (
                <div
                  className="favorite-icon-wrapper"
                  onClick={() => toggleFavorite(tvShow)}
                >
                  <FaRegHeart className="heart-icon" />
                </div>
              ))}
            {user &&
              (isWatchList ? (
                <div
                  className="watchList-icon-wrapper"
                  onClick={() => toggleWatchList(tvShow)}
                >
                  <FaBookmark className="watchlist-icon" />
                </div>
              ) : (
                <div
                  className="watchList-icon-wrapper"
                  onClick={() => toggleWatchList(tvShow)}
                >
                  <FaRegBookmark className="watchlist-icon" />
                </div>
              ))}
          </div>
        </div>
      </div>
)
}
