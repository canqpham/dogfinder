import { createBrowserRouter } from "react-router-dom";
import Error from "./pages/error";
import Home from "./pages/home";
import Voted from "./pages/voted";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
    },
    {
        path: "/voted",
        element: <Voted />,
        errorElement: <Error />,
    },
])

export default router;