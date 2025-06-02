import {
  GeneralMovie,
  GeneralTvShow,
  HomePageLoaderData,
} from "../../types/Movies"
import "./Home.css"
import { useLoaderData, useNavigate } from "react-router"
import {
  fetchMovieListWithAuth,
  fetchTvShowListWithAuth,
} from "../../utils/fetchMovieListWithAuth"
import { MediaList } from "../../components/MovieListComponent/MediaList"
import { useRef } from "react"

export function Home() {
  const searchTermRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const {
    topRatedMoviesList,
    popularMoviesList,
    upcomingMoviesList,
    topRatedTvShowsList,
    popularTvShowsList,
    upcomingTvShowsList,
  } = useLoaderData<HomePageLoaderData>()

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
        <MediaList
          title={"What's popular"}
          movieList={popularMoviesList}
          tvShowList={popularTvShowsList}
        />
          <MediaList
          title={"Must-Watch"}
          movieList={topRatedMoviesList}
          tvShowList={topRatedTvShowsList}
        />
        <MediaList
          title={"Coming Soon"}
          movieList={upcomingMoviesList}
          tvShowList={upcomingTvShowsList}
        />
      </div>
    </div>
  )
}

export async function homePageLoader({ request }: { request: Request }) {
  try {
    const [
      popularMoviesRes,
      upcomingMoviesRes,
      topRatedMoviesRes,
      popularTvShowsRes,
      upcomingTvShowsRes,
      topRatedTvShowsRes,
    ] = await Promise.all([
      fetchMovieListWithAuth("popular", "1", request.signal),
      fetchMovieListWithAuth("upcoming", "1", request.signal),
      fetchMovieListWithAuth("top_rated", "1", request.signal),
      fetchTvShowListWithAuth("popular", "1", request.signal),
      fetchTvShowListWithAuth("on_the_air", "1", request.signal),
      fetchTvShowListWithAuth("top_rated", "1", request.signal),
    ])

    if (
      !popularMoviesRes.ok ||
      !upcomingMoviesRes.ok ||
      !topRatedMoviesRes.ok
    ) {
      throw new Error("Error with fetching the data")
    }

    if (
      !popularTvShowsRes.ok ||
      !upcomingTvShowsRes.ok ||
      !topRatedTvShowsRes.ok
    ) {
      throw new Error("Error with fetching the data")
    }

    const [popularMoviesData, upcomingMoviesData, topRatedMoviesData]: {
      results: GeneralMovie[]
    }[] = await Promise.all([
      popularMoviesRes.json(),
      upcomingMoviesRes.json(),
      topRatedMoviesRes.json(),
    ])

    const [popularTvShowsData, upcomingTvShowsData, topRatedTvShowsData]: {
      results: GeneralTvShow[]
    }[] = await Promise.all([
      popularTvShowsRes.json(),
      upcomingTvShowsRes.json(),
      topRatedTvShowsRes.json(),
    ])

    const popularMoviesList = popularMoviesData.results
    const upcomingMoviesList = upcomingMoviesData.results
    const topRatedMoviesList = topRatedMoviesData.results
    const popularTvShowsList = popularTvShowsData.results
    const upcomingTvShowsList = upcomingTvShowsData.results
    const topRatedTvShowsList = topRatedTvShowsData.results

    return {
      popularMoviesList,
      upcomingMoviesList,
      topRatedMoviesList,
      popularTvShowsList,
      upcomingTvShowsList,
      topRatedTvShowsList,
    }
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}
