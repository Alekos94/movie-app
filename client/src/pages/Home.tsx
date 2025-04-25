import { GeneralMovie, HomePageLoaderData } from "../types/Movies"
import { HomePageMovie } from "../components/HomePageMovie/HomePageMovie"
import "./Home.css"
import { useLoaderData } from "react-router"
import { fetchMovieListWithAuth } from "../utils/fetchMovieListWithAuth"

export function Home() {
  const {topRatedMoviesList, popularMoviesList, upcomingMoviesList} = useLoaderData<HomePageLoaderData>() 

  return (
    //Improvements
    //move this to a seperate component <title> <list> 
    //add loading indicator  (aka a spinner or skeleton loader) React Router lets you define <Suspense> + lazy() or even a global pending state.
    //handle error weith new Response, errorElement in react Router
    <>
      <div>Popular Movies</div>
      <div className="movieList">
        {popularMoviesList.map((movie) => (
          <HomePageMovie key={movie.id.toString()} {...movie} />
        ))}
      </div>
      <div>Upcoming Movies</div>
      <div className="movieList">
        {upcomingMoviesList.map((movie) => (
          <HomePageMovie key={movie.id.toString()} {...movie} />
        ))}
      </div>
      <div>Top-Rated Movies</div>
      <div className="movieList">
        {topRatedMoviesList.map((movie) => (
          <HomePageMovie key={movie.id.toString()} {...movie} />
        ))}
      </div>
    </>
  )
}

export async function homePageLoader({ request }: { request: Request }) {
  try {
    const [popularRes, upcomingRes, topRatedRes] = await Promise.all([
      fetchMovieListWithAuth('popular', request.signal),
      fetchMovieListWithAuth('upcoming', request.signal),
      fetchMovieListWithAuth('top_rated', request.signal)
    ])
    
    if (!popularRes.ok || !upcomingRes.ok || !topRatedRes.ok) {
      throw new Error("Error with fetching the data")
    }
    //here need to work with the types of Promise.all
    const [popularData, upcomingData, topRatedData]: {results: GeneralMovie[]}[] = await Promise.all([
      popularRes.json(),
      upcomingRes.json(),
      topRatedRes.json(),
    ])
    


    const popularMoviesList = popularData.results
    const upcomingMoviesList= upcomingData.results
    const topRatedMoviesList = topRatedData.results

    return { popularMoviesList, upcomingMoviesList, topRatedMoviesList }
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}
