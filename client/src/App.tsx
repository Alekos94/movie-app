import { RouterProvider } from "react-router/dom"
import { router } from "./routes/router"
import { FavoriteProvider } from "./contexes/FavoritesContext"
import './App.css'
function App() {
  return (
    <FavoriteProvider>
      <RouterProvider router={router} />
    </FavoriteProvider>
  )
}

export default App
