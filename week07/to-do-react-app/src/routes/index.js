import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import ToDo from "../pages/Todo/ToDo";

const publicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/to-do",
    element: <ToDo />,
  },
]);

const privateRoutes = [];

export { publicRoutes, privateRoutes };
