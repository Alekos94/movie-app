import {
  fetchMovieListWithAuth,
  fetchMediaTypeGernes,
  fetchFilteredMediaListWithAuth,
  fetchTvShowListWithAuth,
} from "../../utils/fetchMediaDataWithAuth"
import { GeneralMovie, MediaGernes, GeneralTvShow } from "../../types/Movies"
import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router"
import { HomePageMovie } from "../../components/HomePageMovieComponent/HomePageMovie"
import { HomePageTvShow } from "../../components/HomePageTvShowComponent/HomePageTvShow"
import "./MovieListPage.css"
import { useState, useEffect } from "react"
import { DoubleRangeSlider } from "../../components/DoubleRangeSliderComponent.tsx/DoubleRangeSlider"
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io"
import { MoonLoader } from "react-spinners"
import { TfiFaceSad } from "react-icons/tfi"

export function MovieListPage() {
  const { mediaType, category } = useParams()
  const mediaGenreList = useLoaderData<MediaGernes[]>()
  const [list, setList] = useState<GeneralMovie[] | GeneralTvShow[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const [selectedGenresIds, setSelectedGenresIds] = useState<number[]>([])
  const [durationValues, setDurationValues] = useState<number[]>([0, 400])
  const [ratingValues, setRatingValues] = useState<number[]>([0, 10])
  const [filterMenuOn, setFilterMenuOn] = useState<boolean>(false)
  const [filtersOn, setFiltersOn] = useState<boolean>(false)
  const [filterTrigger, setFilterTrigger] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const hasMorePages = totalPages !== null && page < totalPages
  console.log(filterTrigger)
  useEffect(() => {
    setList([])
    setPage(1)
    setFiltersOn(false)
    setFilterTrigger(0)
    setSelectedGenresIds([])
    setDurationValues([0, 400])
    setRatingValues([0, 10])
    setLoading(true)
    const controller = new AbortController()

    async function fetchMedia() {
      try {
        if (!category) {
          throw new Error("No category specified")
        }

        if (mediaType === "movies") {
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
            total_pages: number
          } = await resposne.json()

          const MoviesList = MovieData.results
          setList([...MoviesList])
          setTotalPages(MovieData.total_pages)
          setLoading(false)
        } else {
          const resposne = await fetchTvShowListWithAuth(
            category,
            "1",
            controller.signal
          )

          if (!resposne.ok) {
            throw new Error("Error with fetching the data")
          }

          const TvShowData: {
            results: GeneralTvShow[]
            total_pages: number
          } = await resposne.json()

          const tvShowList = TvShowData.results
          setList([...tvShowList])
          setTotalPages(TvShowData.total_pages)
          setLoading(false)
        }
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message)
        }
      }
    }
    fetchMedia()
  }, [category, mediaType])

  useEffect(() => {
    if (page === 1) return
    const controller = new AbortController()
    async function fetchMoreMedia() {
      try {
        if (!category) {
          throw new Error("No category specified")
        }

        if (!mediaType) {
          throw new Error("No media type specified")
        }
        if (mediaType === "movies") {
          const response = filtersOn
            ? await fetchFilteredMediaListWithAuth(
                category,
                page.toString(),
                mediaType,
                controller.signal,
                {
                  genreIds: selectedGenresIds,
                  minRuntime: durationValues[0],
                  maxRuntime: durationValues[1],
                  minRating: ratingValues[0],
                  maxRating: ratingValues[1],
                }
              )
            : await fetchMovieListWithAuth(
                category,
                page.toString(),
                controller.signal
              )
          if (!response.ok) {
            throw new Error("Error with fetching the data")
          }

          const popularMovieData: {
            results: GeneralMovie[]
            total_pages: number
          } = await response.json()

          const popularMoviesList = popularMovieData.results
          setList((prevList) => [
            ...(prevList as GeneralMovie[]),
            ...popularMoviesList,
          ])
          setTotalPages(popularMovieData.total_pages)
        } else {
          const response = filtersOn
            ? await fetchFilteredMediaListWithAuth(
                category,
                page.toString(),
                mediaType,
                controller.signal,
                {
                  genreIds: selectedGenresIds,
                  minRuntime: durationValues[0],
                  maxRuntime: durationValues[1],
                  minRating: ratingValues[0],
                  maxRating: ratingValues[1],
                }
              )
            : await fetchTvShowListWithAuth(
                category,
                page.toString(),
                controller.signal
              )
          if (!response.ok) {
            throw new Error("Error with fetching the data")
          }

          const tvShowData: {
            results: GeneralTvShow[]
            total_pages: number
          } = await response.json()

          const tvShowList = tvShowData.results
          setList((prevList) => [
            ...(prevList as GeneralTvShow[]),
            ...tvShowList,
          ])
          setTotalPages(tvShowData.total_pages)
        }
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message)
        }
      }
    }
    fetchMoreMedia()
    return () => controller.abort()
  }, [page])

  useEffect(() => {
    setLoading(true)
    if (!filtersOn) return
    const controller = new AbortController()

    async function fetchFilteredMovies() {
      try {
        if (!category) throw new Error("No category specified")

        if (!mediaType) {
          throw new Error("No media type specified")
        }

        const response = await fetchFilteredMediaListWithAuth(
          category,
          "1",
          mediaType,
          controller.signal,
          {
            genreIds: selectedGenresIds,
            minRuntime: durationValues[0],
            maxRuntime: durationValues[1],
            minRating: ratingValues[0],
            maxRating: ratingValues[1],
          }
        )

        if (!response.ok) {
          throw new Error("Error fetching filtered data")
        }

        const data: { results: GeneralMovie[]; total_pages: number } =
          await response.json()
        setList(data.results)
        setLoading(false)
        setTotalPages(data.total_pages)
      } catch (e) {
        if (e instanceof Error) console.log(e.message)
      }
    }

    setList([]) // clear previous results before fetching
    fetchFilteredMovies()
    return () => controller.abort()
  }, [filtersOn, category, filterTrigger])

  function handleGenreSelection(genreId: number) {
    if (!selectedGenresIds.some((id) => genreId === id)) {
      setSelectedGenresIds((prev) => [...prev, genreId])
    } else {
      setSelectedGenresIds(selectedGenresIds.filter((id) => genreId !== id))
    }
  }

  function handleFilterSearch() {
    setPage(1)
    setFiltersOn(true)
    setFilterTrigger((prev) => prev + 1)
  }

  function setCategoryMediaTitle(category: string, mediaType: string) {
    const mediaTilte = mediaType === "movies" ? "Movies" : "TV Shows"
    let categoryTitle: string

    if (category === "popular") {
      categoryTitle = "Popular"
    } else if (category === "top_rated") {
      categoryTitle = "Top Rated"
    } else if (category === "upcoming") {
      categoryTitle = "Upcoming"
    } else {
      categoryTitle = "Currently Airing"
    }

    return (
      <div className="category-title">
        {categoryTitle} {mediaTilte}
      </div>
    )
  }

  return (
    <div className="media-page-wrapper">
      {setCategoryMediaTitle(category ?? "", mediaType ?? "")}
      <div className="media-page-container">
        <div className="media-page-filters">
          <div
            className="filters"
            onClick={() => setFilterMenuOn((prev) => !prev)}
          >
            Filters {filterMenuOn ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </div>
          {filterMenuOn && (
            <>
              <div className="genre-filters">
                <div className="filter-title">Genres:</div>
                <div className="genres-options">
                  {mediaGenreList.map((genre) => (
                    <div
                      className={
                        selectedGenresIds.some((id) => genre.id === id)
                          ? "genre selected"
                          : "genre"
                      }
                      onClick={() => handleGenreSelection(genre.id)}
                    >
                      {genre.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="runtime-filters">
                <div className="filter-title">Duration:</div>
                <DoubleRangeSlider
                  step={15}
                  min={0}
                  max={400}
                  values={durationValues}
                  setValues={setDurationValues}
                />
              </div>
              <div className="userScore-filters">
                <div className="filter-title">Rating:</div>
                <DoubleRangeSlider
                  step={1}
                  min={0}
                  max={10}
                  values={ratingValues}
                  setValues={setRatingValues}
                />
              </div>
              <button
                disabled={
                  (selectedGenresIds.length === 0 &&
                  durationValues[0] === 0 &&
                  durationValues[1] === 400 &&
                  ratingValues[0] === 0 &&
                  ratingValues[1] === 10) && filterTrigger ===0
                }
                className="filterSearch btn"
                onClick={handleFilterSearch}
              >
                Search
              </button>
            </>
          )}
        </div>
        <div className="media-list">
          {loading ? (
            <div className="media-loader-wrapper">
              <MoonLoader color="rgb(245, 124, 0)" size={200} />{" "}
            </div>
          ) : (
            <>
              {list.length === 0 && (
                <div className="noSearchMatch">
                  No items were found that match your query <TfiFaceSad />
                </div>
              )}
              {mediaType === "movies" &&
                list.map((item) => {
                  const movie = item as GeneralMovie
                  return <HomePageMovie key={movie.id.toString()} {...movie} />
                })}

              {mediaType === "tvShows" &&
                list.map((item) => {
                  const show = item as GeneralTvShow
                  return <HomePageTvShow key={show.id.toString()} {...show} />
                })}
              {list.length > 0 && hasMorePages && (
                <button
                  onClick={() => setPage((previousState) => previousState + 1)}
                  className="more-media btn"
                >
                  Load More
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export async function MediaListPageLoader({
  request,
  params,
}: LoaderFunctionArgs) {
  const mediaTypeParam = params.mediaType

  if (mediaTypeParam !== "movies" && mediaTypeParam !== "tvShows") {
    throw new Response("Invalid media type", { status: 400 })
  }

  const media = mediaTypeParam === "movies" ? "movie" : "tv"
  try {
    const response = await fetchMediaTypeGernes(media, request.signal)
    if (!response.ok) {
      throw new Error("Error with fetching the data")
    }
    const genreData: { genres: MediaGernes[] } = await response.json()
    const mediaGenreList = genreData.genres
    return mediaGenreList
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}
