import { GeneralMovie, HomePageLoaderData } from "../../types/Movies"
import "./Home.css"
import { useLoaderData, useNavigate } from "react-router"
import { fetchMovieListWithAuth } from "../../utils/fetchMovieListWithAuth"
import { MovieList } from "../../components/MovieListComponent/MovieList"
import { useRef} from "react"


export function Home() {

  const searchTermRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const { topRatedMoviesList, popularMoviesList, upcomingMoviesList } =
    useLoaderData<HomePageLoaderData>()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (searchTermRef.current !== null) {
      const query = searchTermRef.current.value.trim()
      if (query === "") return
      navigate(`search?mediaSearch=${query}&page=1&category=all`)
    }
  }

  return (
    //Improvements
    //add loading indicator  (aka a spinner or skeleton loader) React Router lets you define <Suspense> + lazy() or even a global pending state.
    //handle error with new Response, errorElement in react Router
    <div className="homePage-container">
      <div className="searchBar">
        <form onSubmit={handleSubmit}>
          <label htmlFor="movieSearch">
            <span>Welcome!</span> <br />
            Hundrends of movies and TV shows for you to discover
          </label>
          <div className="input-container">
            <input
              type="text"
              id="movieSearch"
              name="movieSearch"
              placeholder="Search for a movie, tv show... "
              ref={searchTermRef}
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="moviesList-container">
        <MovieList title={"What's popular"} list={popularMoviesList} />
        <MovieList title={"Coming Soon"} list={upcomingMoviesList} />
        <MovieList title={"Must-Watch"} list={topRatedMoviesList} />
      </div>
    </div>
  )
}

export async function homePageLoader({ request }: { request: Request }) {
  try {
    const [popularRes, upcomingRes, topRatedRes] = await Promise.all([
      fetchMovieListWithAuth("popular", '1', request.signal),
      fetchMovieListWithAuth("upcoming", '1', request.signal),
      fetchMovieListWithAuth("top_rated", '1', request.signal),
    ])

    if (!popularRes.ok || !upcomingRes.ok || !topRatedRes.ok) {
      throw new Error("Error with fetching the data")
    }

    const [popularData, upcomingData, topRatedData]: {
      results: GeneralMovie[]
    }[] = await Promise.all([
      popularRes.json(),
      upcomingRes.json(),
      topRatedRes.json(),
    ])

    const popularMoviesList = popularData.results
    const upcomingMoviesList = upcomingData.results
    const topRatedMoviesList = topRatedData.results
    return { popularMoviesList, upcomingMoviesList, topRatedMoviesList }
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}
