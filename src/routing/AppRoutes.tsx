import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
    {path:'/',element:<MainLayout/>,children:[
        {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
        {path:'login',element:<Login/>},
        {path:'/register',element:<Register/>},
        {path:'*',element:<NotFound/>}
    ]}
])
