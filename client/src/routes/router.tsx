import { createBrowserRouter } from "react-router";
import { Home, homePageLoader } from "../pages/Home";


export const router = createBrowserRouter([
{path: '/', element:<Home/>, loader: homePageLoader}
])