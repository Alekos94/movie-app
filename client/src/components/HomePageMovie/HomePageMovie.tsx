import { GeneralMovie } from "../../types/Movies"
import { defineRatingColor } from "../../utils/defineRatingColor"
import { formatRating } from "../../utils/formatRating"
import './HomePageMovie.css'


export function HomePageMovie({title, poster_path, vote_average, release_date,}: GeneralMovie) {
const ratingColor = defineRatingColor(formatRating(vote_average))
  return (
    <>
      <div className="movieContainer">
        <div className="moviePoster">
          <img src={`https://image.tmdb.org/t/p/w185${poster_path}`} />
        </div>
        <div className={`movieRating ${ratingColor}`}><span className='rating'>{formatRating(vote_average)}</span><span className="percentageSymbol">%</span></div>
        <div className="movieTitle">{title}</div>
        <div className="movieReleaseDate">{release_date}</div>
      </div>
    </>
  )
}
