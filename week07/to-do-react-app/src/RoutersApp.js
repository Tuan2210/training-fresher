import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home/Home.js";

const publicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={publicRoutes} />
    </>
  );
}

export default App;
