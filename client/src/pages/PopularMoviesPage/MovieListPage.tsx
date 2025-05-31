import { fetchMovieListWithAuth } from "../../utils/fetchMovieListWithAuth"
import { GeneralMovie } from "../../types/Movies"
import { useParams } from "react-router"
import { HomePageMovie } from "../../components/HomePageMovieComponent/HomePageMovie"
import "./PopularMoviesPage.css"
import { useState, useEffect } from "react"

export function MovieListPage() {
  const { category } = useParams()
  const [list, setList] = useState<GeneralMovie[]>([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    setList([])
    setPage(1)
    const controller = new AbortController()
    async function fetchMovies() {
      try {
        if (!category) {
          throw new Error("No category specified")
        }

        const resposne = await fetchMovieListWithAuth(
          category,
          "1",
          controller.signal
        )

        if (!resposne.ok) {
          throw new Error("Error with fetching the data")
        }

        const MovieData: {
          results: GeneralMovie[]
        } = await resposne.json()

        const MoviesList = MovieData.results
        setList([...MoviesList])
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message)
        }
      }
    }
    fetchMovies()
  }, [category])

  useEffect(() => {
    if (page === 1) return
    const controller = new AbortController()
    async function fetchMoreMovies() {
      try {
        if (!category) {
          throw new Error("No category specified")
        }

        const resposne = await fetchMovieListWithAuth(
          category,
          page.toString(),
          controller.signal
        )

        if (!resposne.ok) {
          throw new Error("Error with fetching the data")
        }

        const popularMovieData: {
          results: GeneralMovie[]
        } = await resposne.json()

        const popularMoviesList = popularMovieData.results
        setList((prevList) => [...prevList, ...popularMoviesList])
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message)
        }
      }
    }
    fetchMoreMovies()
    return () => controller.abort()
  }, [page])

  return (
    <div className="movies-page-wrapper">
      {category === "popular" && <div>Popular Movies</div>}
      {category === "upcoming" && <div>Upcoming Movies</div>}
      {category === "top_rated" && <div>Top Rated Movies</div>}
      <div className="movies-page-container">
        <div className="movies-page-filters">
          
        </div>
        <div className="movie-list">
          {list.map((movie) => (
            <HomePageMovie key={movie.id.toString()} {...movie} />
          ))}
            <button
              onClick={() => setPage((previousState) => previousState + 1)}
              className="more-movies btn"
            >
              Load More
            </button>
        </div>
      </div>
    </div>
  )
}
