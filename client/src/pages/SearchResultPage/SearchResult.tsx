import { useLoaderData } from "react-router";
import { GeneralMovie } from "../../types/Movies";
import {fetchSearchResultWithAuth } from "../../utils/fetchMovieListWithAuth"
//Imrpovements 
//check how to import more than 20 results
export function SearchResult () {
  const searchMovieResults = useLoaderData()
  console.log(searchMovieResults)
  return <h1>Hello</h1>
}

export async function searchResultPageLoader({ request }: { request: Request }) {
  const url = new URL(request.url)
  const searchParam = url.searchParams.get('movieSearch')

  if (!searchParam) {
    throw new Response("Search term missing", { status: 400 });
  }

  try {
    const moviesRes = await fetchSearchResultWithAuth(searchParam, request.signal)

    if (!moviesRes.ok) {
      throw new Response('Error with fetching the data', {status: 500})
    }

    const movieData: {results: GeneralMovie[]}= await moviesRes.json()
    const movieResultList = movieData.results

    return movieResultList
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}
