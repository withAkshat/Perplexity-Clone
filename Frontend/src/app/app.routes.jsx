import { createBrowserRouter } from "react-router";
import Login from "../features/auth/Pages/Login";
import Register from "../features/auth/Pages/Register";
import Dashboard from "../features/chat/Pages/Dashboard";
import Protected from "../features/auth/components/Protected";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <Protected><Dashboard /></Protected> 
    }
])