import { SearchPagePersonType } from "../../types/Movies"
import { HiOutlinePhoto } from "react-icons/hi2"
import { useNavigate } from "react-router"

export function SearchPagePerson ({profile_path, id, name, known_for_department, known_for}: SearchPagePersonType) {
  const navigate = useNavigate()

  return (
    <div className="searched-person">
      {profile_path ? (
        <img
          onClick={() => navigate(`/movie/${id}`)}
          className="searched-person-poster"
          src={`https://image.tmdb.org/t/p/w185${profile_path}`}
        />
      ) : (
        <div onClick={() => navigate(`/movie/${id}`)} className="noPoster">
          <HiOutlinePhoto className="noPoster-icon" />
        </div>
      )}
      <div className="searched-person-info">
        <div className="searched-person-title">
          <span>{name}</span>
        </div>
        <div className="searched-person-overview"><strong>{known_for_department}:</strong>  {known_for && known_for.length > 0
    ? known_for.map((element, index) => {
        const name = element.title || element.name || 'Untitled';
        return (
          <div className="searched-person-known-for" >
          <span key={index} className="searched-person-known-for-media">
            {name}
          </span>
            {index < known_for.length - 1 && ', '}
          </div>
        );
      })
    : 'No Data'}</div>
      </div>
    </div>
  )
}