import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from '../pages/Home'
import FavPokemons from "../pages/FavPokemons";

const router = createBrowserRouter([
    {
        path:'/',
        element: <Home/>
    },
    {
        path:'/favorites',
        element:<FavPokemons/>
    }
])


const AppRoutes: React.FC = () => {
    return <RouterProvider router={router} />;
  };
  
  export default AppRoutes;