import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";

const publicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const privateRoutes = [];

export { publicRoutes, privateRoutes };
