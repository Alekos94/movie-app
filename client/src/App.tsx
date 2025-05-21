import { RouterProvider } from "react-router/dom"
import { router } from "./routes/router"
import { FavoriteProvider } from "./contexes/FavoritesContext"
import './App.css'
import { UserProvider } from "./contexes/UserContext"
import { WatchListProvider } from "./contexes/WatchListContext"
function App() {
  return (
    <UserProvider>
    <FavoriteProvider>
      <WatchListProvider>
      <RouterProvider router={router} />
      </WatchListProvider>
    </FavoriteProvider>
    </UserProvider>
  )
}

export default App
