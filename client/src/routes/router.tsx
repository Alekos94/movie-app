import { createBrowserRouter, Outlet } from "react-router"
import { Home, homePageLoader } from "../pages/Home/Home"
import {
  SearchResult,
  searchResultPageLoader,
} from "../pages/SearchResultPage/SearchResult"
import { NavBar } from "../components/NavBarComponent/NavBar"
import { MovieDeciatedPage, MovieDedicatedPageLoader } from "../pages/MovieDedicatedPage/MovieDedicatedPage"
import { LoginPage} from "../pages/Login/LoginPage"
import { RegisterPage } from "../pages/Register/RegisterPage"
//add errorElements


export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      { path: "/", element: <Home />, loader: homePageLoader },
      {path: "/login", element: <LoginPage/>},
      {path: "/register", element: <RegisterPage/>},
      { path: "/search", element: <SearchResult />,loader: searchResultPageLoader},
      {path: '/movie/:movieId', element: <MovieDeciatedPage/>, loader: MovieDedicatedPageLoader}
    ],
  },
])

function NavLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}
