import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main/Main";
import Home from "../pages/Home/Home";
import Photos from "../pages/Photos/Photos";

export const Router = createBrowserRouter([
    { index: true, element: <Main /> },
    {
        path: "/", element: <Main />, children: [
            { index: true, element: <Home /> },
            { path: "photos", element: <Photos /> },
            { path: "home", element: <Home /> }

        ]
    },



])