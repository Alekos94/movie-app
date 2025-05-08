import { useNavigate } from "react-router"
import { FavoriteMovie, GeneralMovie } from "../../types/Movies"
import { defineRatingColor } from "../../utils/defineRatingColor"
import { formatRating } from "../../utils/formatRating"
import "./HomePageMovie.css"
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { useFavorites } from "../../contexes/FavoritesContext"

export function HomePageMovie({
  title,
  poster_path,
  vote_average,
  release_date,
  id,
  overview,
  genre_ids,
}: GeneralMovie) {
  const ratingColor = defineRatingColor(formatRating(vote_average))
  const navigate = useNavigate()
  const { favorites, toggleFavorite } = useFavorites()

  const movie: FavoriteMovie = {
    title: title,
    overview: overview,
    tmdb_id: id,
    vote_average: vote_average,
    genre_ids: genre_ids,
    release_date: release_date,
    user_average: null,
    poster_path: poster_path,
  }
  const isFavorite = favorites.some((favorite) => favorite.tmdb_id === id)

  return (
    <div onClick={() => navigate(`movie/${id}`, {})} className="movieContainer">
      <div className="moviePoster">
        <img src={`https://image.tmdb.org/t/p/w185${poster_path}`} />
        <div className={`movieRating ${ratingColor}`}>
          <span className="rating">{formatRating(vote_average)}</span>
          <span className="percentageSymbol">%</span>
        </div>
      </div>
      <div className="movieTitle">{title}</div>
      <div className="movieReleaseDate">{release_date}</div>
    </div>
      // {isFavorite ? (
      //   <div onClick={() => toggleFavorite(movie)}>
      //     <FaHeart className="heart" />
      //   </div>
      // ) : (
      //   <div onClick={() => toggleFavorite(movie)}>
      //     <FaRegHeart className="heart" />
      //   </div>
      // )}
  )
}
