import { createContext, useContext, useState, useEffect } from "react"
import { FavoriteMovie } from "../types/Movies"

type FavoriteContext = {
  favorites: FavoriteMovie[]
  toggleFavorite: (movie: FavoriteMovie) => Promise<void>
  loading: boolean
  error: string | null
}

const FavoriteContext = createContext<FavoriteContext | null>(null)

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchfavorites() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/movies/favorites",
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
        setFavorites(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchfavorites()
  }, [])

  async function toggleFavorite(movie: FavoriteMovie) {
    const isFavorite = favorites.find((fav) => fav.tmdb_id === movie.tmdb_id)
    const previousFavorites = [...favorites]
    //update the UI to reflect the change immediately and make the app to feel more responsive.
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.tmdb_id !== movie.tmdb_id)
      : [...favorites, movie]
    setFavorites(updatedFavorites)
    try {
      if (isFavorite) {
        await fetch("http://localhost:3000/api/movies/favorites", {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tmdb_id: movie.tmdb_id }),
        })
      } else {
        await fetch("http://localhost:3000/api/movies/favorites", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(movie),
        })
      }
    } catch (e) {
      console.error("Failed to stringify or send request", e)
      //rollback in case the API fails to ensure that the client and the server are aligned
      setFavorites(previousFavorites)
    }
  }

  return (
    <FavoriteContext.Provider
      value={{ favorites, toggleFavorite, loading, error }}
    >
      {children}
    </FavoriteContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoriteContext)

  if (!context) {
    throw new Error("useFavorite must be inside the FavoriteProvider")
  }

  return context
}
