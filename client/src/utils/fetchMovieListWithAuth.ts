export function fetchMovieListWithAuth (endpoint:string, signal: AbortSignal) {
  const key: string = import.meta.env.VITE_SECRET
  const baseUrl: string = import.meta.env.VITE_BASEURL

  return fetch(`${baseUrl}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${key}`,
    },
    signal
  })
}