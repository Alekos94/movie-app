import { useNavigate, useLoaderData, useSearchParams } from "react-router"
import { GeneralMovie } from "../../types/Movies"
import { fetchSearchResultWithAuth } from "../../utils/fetchMovieListWithAuth"
import { SearchPageMovie } from "../../components/SearchPageMovieComponent/SearchPageMovie"
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi"
import { renderPageNumbers } from "../../utils/renderPageNumbers"

type SearchResultPageLoaderData = {
  searchMovieResults: GeneralMovie[]
  currentPage: number
  total_pages: number
  total_results: number
}
//Imrpovements
//check how to import more than 20 results
export function SearchResult() {
  const { searchMovieResults, total_pages, total_results } =
    useLoaderData() as SearchResultPageLoaderData
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const page = Number(searchParams.get("page"))
  const query = searchParams.get("movieSearch")
  function navigateToNextPage() {
    navigate(`/search?movieSearch=${query}&page=${page + 1}`)
  }

  function navigateToPreviousPage() {
    navigate(`/search?movieSearch=${query}&page=${page - 1}`)
  }

  function navigateToParticularPage(page: number) {
    navigate(`/search?movieSearch=${query}&page=${page}`)
  }

  return (
    <div className="search-page-wrapper">
      <div className="result-summary">
        <span>
          Page <strong>{page}</strong> of {total_pages}
        </span>{" "}
        | <span>Total results: {total_results}</span>
      </div>
      <div className="search-results">
        {searchMovieResults.map((movie) => (
          <SearchPageMovie key={movie.id} {...movie} />
        ))}
      </div>
      <div className="page-breakdown">
        <button
          disabled={page === 1}
          onClick={navigateToPreviousPage}
          className="left-arrow"
        >
          <HiOutlineArrowSmLeft /> Previous
        </button>

        {renderPageNumbers(page, total_pages, navigateToParticularPage)}

        <button
          disabled={page === 80}
          onClick={navigateToNextPage}
          className="right-arrow"
        >
          Next <HiOutlineArrowSmRight />
        </button>
      </div>
    </div>
  )
}

export async function searchResultPageLoader({
  request,
}: {
  request: Request
}) {
  const url = new URL(request.url)
  const query = url.searchParams.get("movieSearch")
  const page = url.searchParams.get("page")
  if (!query || !page) {
    throw new Response("Search term missing", { status: 400 })
  }

  try {
    const moviesRes = await fetchSearchResultWithAuth(
      query,
      page,
      request.signal
    )

    if (!moviesRes.ok) {
      throw new Response("Error with fetching the data", { status: 500 })
    }

    const movieData: {
      results: GeneralMovie[]
      page: number
      total_pages: number
      total_results: number
    } = await moviesRes.json()

    console.log(movieData)
    return {
      searchMovieResults: movieData.results,
      currentPage: movieData.page,
      total_pages: movieData.total_pages,
      total_results: movieData.total_results,
    }
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}
