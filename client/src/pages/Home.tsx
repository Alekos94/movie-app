import { useEffect, useState } from "react"
import { GeneralMovie } from "../types/Movies"
import { HomePageMovie } from "../components/HomePageMovie/HomePageMovie"
import './Home.css'

export function Home() {
  const [popularList, setPopularList] = useState<GeneralMovie[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const key: string = import.meta.env.VITE_SECRET

  useEffect(() => {
    const controller = new AbortController()

    async function fetchPopularMovies() {
      setError(null)
      setLoading(true)
      setPopularList([])

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${key}`,
            },
            signal: controller.signal,
          }
        )
        if (!response.ok) {
          throw new Error("Failed to fetch list of popular movies")
        }
        const data = await response.json()

        const list: GeneralMovie[] = data.results //need to work on in temrs of typescript
        setPopularList(list)
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPopularMovies()

    return () => {
      controller.abort()
    }
  }, [])

  console.log(popularList)
  return (
    <>
      <div>Popular Movies</div>
      <div className="popularMovieList">
        {popularList.map((movie) => (
          <HomePageMovie key={movie.id.toString()} {...movie} />
        ))}
      </div>
    </>
  )
}
