import { createContext, useContext, useState, useEffect } from "react"
import { FavoriteMovie } from "../types/Movies"

type WatchListContext = {
  watchList: FavoriteMovie[]
  toggleWatchList: (movie: FavoriteMovie) => Promise<void>
  loading: boolean
  error: string | null
}

const WatchListContext = createContext<WatchListContext | null>(null)

export function WatchListProvider({ children }: { children: React.ReactNode }) {
  const [watchList, setWatchList] = useState<FavoriteMovie[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchWatchList() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/movies/watchlist",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        if (!response.ok) {
          throw new Error("Something went wrong")
        }
        const data = await response.json()
        setWatchList(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWatchList()
  }, [])

 async function toggleWatchList (movie: FavoriteMovie) {
  const isWatchList = watchList.find((item) => item.tmdb_id === movie.tmdb_id)
  const previousWatchList = [...watchList]

  const updatedWatchList = isWatchList 
  ? watchList.filter((item) => item.tmdb_id !== movie.tmdb_id)
  :[...watchList, movie]
  setWatchList(updatedWatchList)

  try {
    if (isWatchList) {
      await fetch("http://localhost:3000/api/movies/watchlist", {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tmdb_id: movie.tmdb_id }),
      })
    } else {
      await fetch("http://localhost:3000/api/movies/watchlist", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie),
      })
    }
  } catch (e) {
    console.error("Failed to stringify or send request", e)
    //rollback in case the API fails to ensure that the client and the server are aligned
    setWatchList(previousWatchList)
  }
 }

  return (
    <WatchListContext.Provider
      value={{ watchList, toggleWatchList, loading, error }}
    >
      {children}
    </WatchListContext.Provider>
  )
}

export function useWatchListContext() {
  const context = useContext(WatchListContext)

  if (!context) {
    throw new Error("useFavorite must be inside the FavoriteProvider")
  }

  return context
}
