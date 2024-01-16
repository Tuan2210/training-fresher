import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";

const publicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dangky",
    element: <Register />,
  },
]);

const privateRoutes = [];

export { publicRoutes, privateRoutes };
