import { LoaderFunctionArgs, useLoaderData} from "react-router";
import { fetchMovieDetails } from "../../utils/fetchMovieListWithAuth";
import { MovieDetails } from "../../types/Movies";

export function MovieDeciatedPage () {
  const movie = useLoaderData<MovieDetails>()
  return ( 
    <div>{movie.id} {movie.title}</div>
  )

}

export async function MovieDedicatedPageLoader ({ request, params }: LoaderFunctionArgs) {
  const {movieId} = params

    if (!movieId) {
      throw new Response("Missing movie ID", { status: 400 });
    }
  
    const movieRes = await fetchMovieDetails(movieId, request.signal);
    if (!movieRes.ok) {
      throw new Response("Failed to fetch movie details", { status: 502 });
    }

    const movie = await movieRes.json() as MovieDetails;
  
    if (!movie.id) {
      throw new Response("Movie not found", { status: 404 });
    }
  
    return movie;
  }