import { GeneralMovie } from "../../types/Movies"
import { HomePageMovie } from "../HomePageMovieComponent/HomePageMovie"
import { FaPlayCircle } from "react-icons/fa"
import { TfiMenuAlt } from "react-icons/tfi"
import { useState } from "react"
import "./MediaList.css"
import { HomePageTvShow } from "../HomePageTvShowComponent/HomePageTvShow"
import { GeneralTvShow } from "../../types/Movies"

export function MediaList({
  title,
  movieList,
  tvShowList,
}: {
  title: string
  movieList: GeneralMovie[]
  tvShowList: GeneralTvShow[]
}) {
  const [selected, setSelected] = useState<string>("movies")

  function selectMediaType(mediaType: string) {
    setSelected(mediaType)
  }

  return (
    <>
      <div className="media-selector">
        <div className="list-title">{title}</div>
        <div
          className={
            selected === "movies" ? "media-option active" : "media-option"
          }
          onClick={() => selectMediaType("movies")}
        >
          <div className="media-selector-icon">
            <FaPlayCircle /> Movies
          </div>
        </div>
        <div
          className={
            selected === "tvShows" ? "media-option active" : "media-option"
          }
          onClick={() => selectMediaType("tvShows")}
        >
          <div className="media-selector-icon">
            <TfiMenuAlt /> TV Shows
          </div>
        </div>
      </div>
      <div className={`movieList ${selected !== "movies" ? "hidden" : ""}`}>
        {selected === "movies" &&
          movieList.map((movie) => (
            <HomePageMovie key={movie.id.toString()} {...movie} />
          ))}
      </div>
      <div className={`movieList ${selected !== "tvShows" ? "hidden" : ""}`}>
        {selected === "tvShows" &&
          tvShowList.length > 0 &&
          tvShowList.map((tvShow) => (
            <HomePageTvShow key={tvShow.id.toString()} {...tvShow} />
          ))}
      </div>
    </>
  )
}
