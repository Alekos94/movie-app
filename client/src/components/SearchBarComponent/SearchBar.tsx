import { useRef } from "react"
import { useNavigate } from "react-router"


export function SearchBar({searchKeyword}: {searchKeyword: string}) {
   const searchTermRef = useRef<HTMLInputElement>(null)
   const navigate = useNavigate()
   
   function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (searchTermRef.current !== null) {
      const query = searchTermRef.current.value.trim()
      if (query === "") return // to ensure that with an empty searchbar nothing happens
      navigate(`/search?mediaSearch=${query}&page=1&category=all`)
    }
  }
  return (
    <div className="searchBar">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            id="movieSearch"
            name="movieSearch"
            placeholder="Search for a movie, tv show... "
            ref={searchTermRef}
            defaultValue={searchKeyword}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
    </div>
  )
}
