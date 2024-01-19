import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import PrdDetails from "../pages/PrdDetails/PrdDetails";

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
  {
    path: "/quenmatkhau",
    element: <ForgotPassword />,
  },
  {
    path: "/sanpham/:prdName",
    element: <PrdDetails />,
  },
]);

const privateRoutes = [];

export { publicRoutes, privateRoutes };
