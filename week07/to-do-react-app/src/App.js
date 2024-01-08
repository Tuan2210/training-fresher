import { RouterProvider } from "react-router-dom";

import { publicRoutes } from "./routes";

function App() {
  return (
    <div className="max-w-full h-screen">
      <RouterProvider router={publicRoutes} />
    </div>
  );
}

export default App;
