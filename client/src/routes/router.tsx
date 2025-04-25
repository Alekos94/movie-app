import { createBrowserRouter } from "react-router"
import { Home, homePageLoader } from "../pages/Home/Home"
import { SearchResult, searchResultPageLoader } from "../pages/SearchResultPage/SearchResult"

export const router = createBrowserRouter([
  { path: "/", element: <Home />, loader: homePageLoader},
  {path: '/search', element: <SearchResult/>, loader: searchResultPageLoader}
])
