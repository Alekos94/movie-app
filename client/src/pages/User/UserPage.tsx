import { Navigate } from "react-router"
import { useUserContext } from "../../contexes/UserContext"
import { useFavoritesContext } from "../../contexes/FavoritesContext"
import { useWatchListContext } from "../../contexes/WatchListContext"
import { useEffect, useState } from "react"
import {
  fetchTvShowRecommendations,
  fetchMovieRecommendations,
} from "../../utils/fetchMovieListWithAuth"
import { GeneralTvShow, GeneralMovie } from "../../types/Movies"
import { HomePageMovie } from "../../components/HomePageMovieComponent/HomePageMovie"
import { HomePageTvShow } from "../../components/HomePageTvShowComponent/HomePageTvShow"
import "./UserPage.css"
import { MdOutlineEmail } from "react-icons/md"

export function UserPage() {
  const { user } = useUserContext()
  const { watchList } = useWatchListContext()
  const { favorites } = useFavoritesContext()
  const [selectedMedia, setSelectedMedia] = useState<string>("")
  const [selectedMediaType, setSelectedMediaType] = useState<string>("")
  const [recommendations, setRecommendations] = useState<
    GeneralMovie[] | GeneralTvShow[]
  >([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  console.log(selectedMedia)
  console.log(recommendations)
  useEffect(() => {
    const controller = new AbortController()
    async function fetchRecommendation() {
      try {
        if (selectedMediaType === "") {
          return
        } else if (selectedMediaType === "movie") {
          const responseMovies = await fetchMovieRecommendations(
            selectedMedia,
            controller.signal
          )

          if (!responseMovies.ok) {
            throw new Error("Something went wrong")
          }

          const movieData: { results: GeneralMovie[] } =
            await responseMovies.json()
          setRecommendations(movieData.results)
        } else {
          const resposneTvShows = await fetchTvShowRecommendations(
            selectedMedia,
            controller.signal
          )

          if (!resposneTvShows.ok) {
            throw new Error("Something went wrong")
          }

          const tvShowData: { results: GeneralTvShow[] } =
            await resposneTvShows.json()
          setRecommendations(tvShowData.results)
        }
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchRecommendation()
    return () => controller.abort()
  }, [selectedMedia, selectedMediaType])

  function handleSelectionChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const mediaId = event.target.value
    const media = favorites.find(
      (media) => media.tmdb_id.toString() === mediaId
    )

    if (media) {
      setSelectedMedia(media.tmdb_id.toString())
      setSelectedMediaType(media.media_type)
    }
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="userPage-wrapper">
      <div className="userInfo-container">
        <div className="userPersonalInfo">
          <div className="userName">
            {user.name} {user.surname}
          </div>
          <div className="userEmail">
            <MdOutlineEmail /> {user.email}
          </div>
        </div>
        <div className="userMediaInfo">
          <div className="userFavorites"> Favorites ({favorites.length})</div>
          <div className="userWatchList"> Watchlist ({watchList.length})</div>
        </div>
      </div>

      <div>Reccomendations</div>
      <div>
        <select value={selectedMedia} onChange={handleSelectionChange}>
          <option value="" disabled>
            Choose from your favorites
          </option>
          {favorites.map((media) => (
            <option key={media.tmdb_id} value={media.tmdb_id}>
              {media.title}
            </option>
          ))}
        </select>
      </div>
      <div className="recommended-list">
        {selectedMediaType === "movie" &&
          recommendations.map((movie) => (
            <HomePageMovie key={movie.id} {...movie} />
          ))}
        {selectedMediaType === "tvShow" &&
          recommendations.map((tvShow) => (
            <HomePageTvShow key={tvShow.id} {...tvShow} />
          ))}
      </div>
    </div>
  )
}
