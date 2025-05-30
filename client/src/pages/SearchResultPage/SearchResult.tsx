import { useNavigate, useLoaderData, useSearchParams } from "react-router"
import {
  SearchPageTvShowType,
  SearchPagePersonType,
  SearchPageMovieType,
  GeneralMediaType,
} from "../../types/Movies"
import { fetchSearchResultWithAuth } from "../../utils/fetchMovieListWithAuth"
import { SearchPageMovie } from "../../components/SearchPageMovieComponent/SearchPageMovie"
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi"
import { renderPageNumbers } from "../../utils/renderPageNumbers"
import { useState, useEffect } from "react"
import { SearchPageTvShow } from "../../components/SearchPageTvShowComponent/SearchPageTvShow"
import { SearchPagePerson } from "../../components/SearchPagePersonComponent/SearchPagePerson"
import { SearchPageGeneralMedia } from "../../components/SearchPageMediaComponent/SearchPageGeneralMedia"
import './SearchPage.css'
import { SearchPageNoResultsFound } from "../../components/SearchPageNoResultsFoundComponent/SearchPageNoResultsFound"
import { SearchBar } from "../../components/SearchBarComponent/SearchBar"

type SearchResultPageLoaderData = {
  searchResults: (
    | GeneralMediaType
    | SearchPageMovieType
    | SearchPageTvShowType
    | SearchPagePersonType
  )[]
  currentPage: number
  total_pages: number
  total_results: number
}

export function SearchResult() {
  const { searchResults, total_pages, total_results } =
    useLoaderData() as SearchResultPageLoaderData
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const page = Number(searchParams.get("page"))
  const query = searchParams.get("mediaSearch")
  const category = searchParams.get("category")

  const [activeCategory, setActiveCategory] = useState(category)
  console.log(searchResults)
  useEffect(() => {
    setActiveCategory(category)
  }, [category])

  function navigateToNextPage() {
    navigate(
      `/search?mediaSearch=${query}&page=${page + 1}&category=${category}`
    )
  }

  function navigateToPreviousPage() {
    navigate(
      `/search?mediaSearch=${query}&page=${page - 1}&category=${category}`
    )
  }

  function navigateToParticularPage(page: number) {
    navigate(`/search?mediaSearch=${query}&page=${page}&category=${category}`)
  }

  function switchCategory(newCategory: string) {
    setActiveCategory(newCategory)
    searchParams.set("category", newCategory)
    searchParams.set("page", "1")
    setSearchParams(searchParams)
  }

  return (
    searchResults.length === 0 ? <SearchPageNoResultsFound searchKeyword={query!}/> : 
    <div className="search-page-wrapper">
      <div className="result-summary">
        <div className="highLevel-result-summary">
          <span>
            Page <strong>{page}</strong> of {total_pages}
          </span>{" "}
          | <span>Total results: {total_results}</span>
        </div>
        <div className="result-summary-perCategory">
          <div
            onClick={() => switchCategory("all")}
            className={
              activeCategory === "all" ? "category active" : "category"
            }
          >
            All
          </div>
          <div
            onClick={() => switchCategory("movie")}
            className={
              activeCategory === "movie" ? "category active" : "category"
            }
          >
            Movies
          </div>
          <div
            onClick={() => switchCategory("tv")}
            className={activeCategory === "tv" ? "category active" : "category"}
          >
            Tv Shows
          </div>
          <div
            onClick={() => switchCategory("person")}
            className={
              activeCategory === "person" ? "category active" : "category"
            }
          >
            People
          </div>
        </div>
        <SearchBar searchKeyword={query!}/>
      </div>
      <div className="search-results">
        {activeCategory === "all" &&
          (searchResults as GeneralMediaType[]).map((generalMedia) => (
            <SearchPageGeneralMedia
              key={generalMedia.id}
              {...generalMedia}
              category={activeCategory}
            />
          ))}
          {activeCategory === "movie" &&
          (searchResults as SearchPageMovieType[]).map((movie) => (
            <SearchPageMovie key={movie.id} {...movie} />
          ))}
        {activeCategory === "tv" &&
          (searchResults as SearchPageTvShowType[]).map((tvShow) => (
            <SearchPageTvShow key={tvShow.id} {...tvShow} />
          ))}
        {activeCategory === "person" &&
          (searchResults as SearchPagePersonType[]).map((person) => (
            <SearchPagePerson key={person.id} {...person} />
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
          disabled={page === total_pages}
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
  const query = url.searchParams.get("mediaSearch")
  const page = url.searchParams.get("page")
  const category = url.searchParams.get("category")

  if (!query || !page || !category) {
    throw new Response("Search term missing", { status: 400 })
  }

  try {
    const moviesRes = await fetchSearchResultWithAuth(
      query,
      page,
      category,
      request.signal
    )

    if (!moviesRes.ok) {
      throw new Response("Error with fetching the data", { status: 500 })
    }

    const movieData: {
      results: GeneralMediaType[]
      page: number
      total_pages: number
      total_results: number
    } = await moviesRes.json()

    return {
      searchResults: movieData.results,
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
