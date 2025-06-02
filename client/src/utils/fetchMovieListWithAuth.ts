export function fetchMovieListWithAuth (endpoint:string, page: string, signal: AbortSignal) {
  const key: string = import.meta.env.VITE_SECRET
  const baseUrl: string = import.meta.env.VITE_BASEURL_MOVIE_LISTS

  return fetch(`${baseUrl}${endpoint}?page=${page}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${key}`,
    },
    signal
  })
}

export function fetchTvShowListWithAuth (endpoint:string, page: string, signal: AbortSignal) {
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


export function fetchSearchResultWithAuth (searchKeyword: string, page: string, category: string, signal: AbortSignal) {
  const key: string = import.meta.env.VITE_SECRET
  if (category === 'all') {
    const baseUrl: string = import.meta.env.VITE_BASEURL_MULTY_SEARCH
    return fetch(`${baseUrl}?query=${searchKeyword}&page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${key}`,
      },
      signal
    })
  } else if (category === 'movie') {
    const baseUrl: string = import.meta.env.VITE_BASEURL_MOVIE_SEARCH
    return fetch(`${baseUrl}?query=${searchKeyword}&page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${key}`,
      },
      signal
    })
  } else if (category === 'tv') {
    const baseUrl: string = import.meta.env.VITE_BASEURL_TV_SEARCH
    return fetch(`${baseUrl}?query=${searchKeyword}&page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${key}`,
      },
      signal
    })
  } else {
    const baseUrl: string = import.meta.env.VITE_BASEURL_PERSON_SEARCH
    return fetch(`${baseUrl}?query=${searchKeyword}&page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${key}`,
      },
      signal
    })
  }
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