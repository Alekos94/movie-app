export function fetchMovieListWithAuth (endpoint:string, signal: AbortSignal) {
  const key: string = import.meta.env.VITE_SECRET
  const baseUrl: string = import.meta.env.VITE_BASEURL_MOVIE_LISTS

  return fetch(`${baseUrl}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${key}`,
    },
    signal
  })
}

export function fecthTvShowListWithAuth (endpoint:string, signal: AbortSignal) {
  const key: string = import.meta.env.VITE_SECRET
  const baseUrl: string = import.meta.env.VITE_BASEURL_TV_LISTS

  return fetch(`${baseUrl}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${key}`,
    },
    signal
  })
}

export function fetchSearchResultWithAuth (searchKeyword: string, page: string, signal: AbortSignal) {
  const key: string = import.meta.env.VITE_SECRET
  const baseUrl: string = import.meta.env.VITE_BASEURL_MOVIE_SEARCH

  return fetch(`${baseUrl}?query=${searchKeyword}&page=${page}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${key}`,
    },
    signal
  })
}

export function fetchMovieDetails (movieId: string, signal: AbortSignal) {
  const key: string = import.meta.env.VITE_SECRET
  const baseUrl: string = import.meta.env.VITE_BASEURL_MOVIE_LISTS

  return fetch(`${baseUrl}${movieId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${key}`,
    },
    signal
  })
}