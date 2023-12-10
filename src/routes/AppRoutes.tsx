import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from '../pages/Home'
import FavPokemons from "../pages/FavPokemons";
import Nav from "../components/header/Nav";

const router = createBrowserRouter([
    {
        path:'/',
        element: <Nav children={<Home/>}/>
    },
    {
        path:'/favorites',
        element:<Nav children={<FavPokemons/>}/>
    }
])


const AppRoutes: React.FC = () => {
    return <RouterProvider router={router} />;
  };
  
  export default AppRoutes;