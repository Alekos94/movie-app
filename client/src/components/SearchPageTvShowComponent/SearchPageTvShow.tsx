import { SearchPageTvShowType } from "../../types/Movies"
import { HiOutlinePhoto } from "react-icons/hi2"
import { useNavigate } from "react-router"

export function SearchPageTvShow({
  id,
  name,
  original_name,
  first_air_date,
  overview,
  poster_path,
}: SearchPageTvShowType) {
  const navigate = useNavigate()

  return (
    <div className="searched-tvShow">
      {poster_path ? (
        <img
          onClick={() => navigate(`/tvShow/${id}`)}
          className="searched-tvShow-poster"
          src={`https://image.tmdb.org/t/p/w185${poster_path}`}
        />
      ) : (
        <div onClick={() => navigate(`/tvShow/${id}`)} className="noPoster">
          <HiOutlinePhoto className="noPoster-icon" />
        </div>
      )}
      <div className="searched-tvShow-info">
        <div className="searched-tvShow-title">
          <span>{name}</span> <span className="originalTitle">{name !== original_name && `(${original_name})`}</span>
          <br />
          <span className="searched-tvShow-releaseDate">{first_air_date}</span>
        </div>
        <div className="searched-tvShow-overview"><strong>Overview</strong>: {overview ? overview : 'Overview not available.'}</div>
      </div>
    </div>
  )
}
