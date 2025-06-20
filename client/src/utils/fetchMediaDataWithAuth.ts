export function fetchMovieListWithAuth (endpoint:string, page: string,signal: AbortSignal) {
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



export function fetchFilteredMediaListWithAuth(endpoint:string, page: string, mediaType: string, signal: AbortSignal, filters: {
  genreIds?: number[]
  minRuntime?: number
  maxRuntime?: number
  minRating?: number
  maxRating?: number
}) {
  const key: string = import.meta.env.VITE_SECRET
  const tvShowBaseUrl: string = import.meta.env.VITE_BASEURL_TV_DISCOVER_LISTS
  const movieBaseUrl: string = import.meta.env.VITE_BASEURL_MOVIE_DISCOVER_LISTS
  const sortByMap: Record<string, string> = {
    popular: "popularity.desc",
    top_rated: "vote_average.desc",
    upcoming: "release_date.desc",
    on_the_air: 'first_air_date.desc'
  }

  const queryParams = new URLSearchParams({
    page,
  })

  queryParams.append("sort_by", sortByMap[endpoint] ?? "popularity.desc")

  if (filters?.genreIds?.length) {
    queryParams.append("with_genres", filters.genreIds.join(","))
  }

  if (filters.minRuntime !== undefined) {
    queryParams.append("with_runtime.gte", filters.minRuntime.toString())
  }

  if (filters.maxRuntime !== undefined) {
    queryParams.append("with_runtime.lte", filters.maxRuntime.toString())
  }

  if (filters.minRating !== undefined) {
    queryParams.append("vote_average.gte", filters.minRating.toString())
  }

  if (filters.maxRating !== undefined) {
    queryParams.append("vote_average.lte", filters.maxRating.toString())
  }

if (mediaType === 'movies') {
  return fetch(`${movieBaseUrl}?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${key}`,
    },
    signal
  })
} else {
  return fetch(`${tvShowBaseUrl}?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${key}`,
    },
    signal
  })
}
}

export function fetchTvShowListWithAuth (endpoint:string, page: string, signal: AbortSignal) {
  const key: string = import.meta.env.VITE_SECRET
  const baseUrl: string = import.meta.env.VITE_BASEURL_TV_LISTS

  return fetch(`${baseUrl}${endpoint}?page=${page}`, {
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

export function fetchTvShowDetails (tvShowId: string, signal: AbortSignal) {
  const key: string = import.meta.env.VITE_SECRET
  const baseUrl: string = import.meta.env.VITE_BASEURL_TV_LISTS

  return fetch(`${baseUrl}${tvShowId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${key}`,
    },
    signal
  })
}


export function fetchMovieRecommendations (movieId: string, signal: AbortSignal) {
  const key: string = import.meta.env.VITE_SECRET
  const baseUrl: string = import.meta.env.VITE_BASEURL_MOVIE_LISTS

  return fetch(`${baseUrl}${movieId}/recommendations`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${key}`,
    },
    signal
  })
}

export function fetchTvShowRecommendations (tvShowId: string, signal: AbortSignal) {
  const key: string = import.meta.env.VITE_SECRET
  const baseUrl: string = import.meta.env.VITE_BASEURL_TV_LISTS

  return fetch(`${baseUrl}${tvShowId}/recommendations`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${key}`,
    },
    signal
  })
}

export function fetchMediaTypeGernes (media: string, signal: AbortSignal) {
  const key: string = import.meta.env.VITE_SECRET

  return fetch(`https://api.themoviedb.org/3/genre/${media}/list`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${key}`,
    },
    signal
  }) 
}

