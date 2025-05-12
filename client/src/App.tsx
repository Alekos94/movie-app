import { RouterProvider } from "react-router/dom"
import { router } from "./routes/router"
import { FavoriteProvider } from "./contexes/FavoritesContext"
import './App.css'
import { UserProvider } from "./contexes/UserContext"
function App() {
  return (
    <UserProvider>
    <FavoriteProvider>
      <RouterProvider router={router} />
    </FavoriteProvider>
    </UserProvider>
  )
}

export default App
