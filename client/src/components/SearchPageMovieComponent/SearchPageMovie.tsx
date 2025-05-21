import { GeneralMovie } from "../../types/Movies";
import './SearchPageMovie.css'
import { HiOutlinePhoto } from "react-icons/hi2";

export function SearchPageMovie ({title, release_date, overview, poster_path}: GeneralMovie) {
  return (
    <div className="searched-movie">
      {poster_path ? <img className='searched-movie-poster' src={`https://image.tmdb.org/t/p/w185${poster_path}`}/> : <div className="noPoster"><HiOutlinePhoto className="noPoster-icon"/></div>}
      <div className="searched-movie-info">
        <div className='searched-movie-title'>
          {title}
          <br/>
          <span>{release_date}</span>
        </div>
        <div className="searched-movie-overview">
          {overview}
        </div>
      </div>
    </div>
  )
}