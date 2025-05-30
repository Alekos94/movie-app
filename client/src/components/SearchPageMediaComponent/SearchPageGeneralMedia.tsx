import {GeneralMediaType } from "../../types/Movies";
import { HiOutlinePhoto } from "react-icons/hi2";
import { useNavigate } from "react-router";

export function SearchPageGeneralMedia ({id, title, name, media_type, release_date, overview, poster_path}: GeneralMediaType) {
  const navigate = useNavigate()
  
  return (
    <div className="searched-generalMedia">
      {poster_path ? <img onClick={() => navigate(`/movie/${id}`)}  className='searched-generalMedia-poster' src={`https://image.tmdb.org/t/p/w185${poster_path}`}/> : <div onClick={() => navigate(`/movie/${id}`)} className="noPoster"><HiOutlinePhoto className="noPoster-icon"/></div>}
      <div className="searched-generalMedia-info">
        <div className='searched-generalMedia-title'>
        {media_type === 'movie' ? title : name} <span className="mediaType">({media_type})</span>
          <br/>
          <span className="searched-generalMedia-releaseDate">{release_date}</span>
        </div>
        <div className="searched-generalMedia-overview">
         <strong>Overview</strong>: {overview}
        </div>
      </div>
    </div>
  )
}