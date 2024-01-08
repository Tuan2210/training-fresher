import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home.js";
import Todo from "../pages/Todo/Todo.js";

const publicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/to-do",
    element: <Todo />,
  },
]);

const privateRoutes = [];

export { publicRoutes, privateRoutes };
