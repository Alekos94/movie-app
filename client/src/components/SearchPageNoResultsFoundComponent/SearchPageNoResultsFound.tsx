import { SearchBar } from "../SearchBarComponent/SearchBar"
import './SearchPageNoResultsFound.css'
export function SearchPageNoResultsFound ({searchKeyword}: {searchKeyword: string}) {
  return (
    <div className="noResults-wrapper">
    <div className="noResult-message">Sorry, we couldn’t find any results for <strong>‘{searchKeyword}’</strong>. <br/>Please try a different search.</div>
    <SearchBar searchKeyword={searchKeyword}/>
    </div>
  )
}