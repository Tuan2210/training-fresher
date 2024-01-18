import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";

const publicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dangky",
    element: <Register />,
  },
  {
    path: "/dangnhap",
    element: <Login />,
  },
]);

const privateRoutes = [];

export { publicRoutes, privateRoutes };
