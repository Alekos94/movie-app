import { GeneralMovie } from "../../types/Movies"
import { HomePageMovie } from "../HomePageMovieComponent/HomePageMovie"

export function MovieList({ title, list }: {title: string, list: GeneralMovie[]}) {
  return (
    <>
      <div className="list-title">{title}</div>
      <div className="movieList">
        {list.map((movie) => (
          <HomePageMovie key={movie.id.toString()} {...movie} />
        ))}
      </div>
    </>
  )
}
