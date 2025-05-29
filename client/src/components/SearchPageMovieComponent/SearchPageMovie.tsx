import {GeneralMediaType } from "../../types/Movies";
import './SearchPageMovie.css'
import { HiOutlinePhoto } from "react-icons/hi2";
import { useNavigate } from "react-router";

export function SearchPageMovie ({id, title, name, media_type, release_date, overview, poster_path}: GeneralMediaType) {
  const navigate = useNavigate()
  
  return (
    <div className="searched-movie">
      {poster_path ? <img onClick={() => navigate(`/movie/${id}`)}  className='searched-movie-poster' src={`https://image.tmdb.org/t/p/w185${poster_path}`}/> : <div onClick={() => navigate(`/movie/${id}`)} className="noPoster"><HiOutlinePhoto className="noPoster-icon"/></div>}
      <div className="searched-movie-info">
        <div className='searched-movie-title'>
        {media_type === 'movie' ? title : name} ({media_type})
          <br/>
          <span className="searched-movie-releaseDate">{release_date}</span>
        </div>
        <div className="searched-movie-overview">
         Overview: {overview}
        </div>
      </div>
    </div>
  )
}