import { RouterProvider } from "react-router-dom";

import { publicRoutes } from "./routes";

function App() {
  return (
    <div className="wrpall max-w-full h-screen mx-auto pl-9 pr-9 overflow-y-auto">
      <RouterProvider router={publicRoutes} />
    </div>
  );
}

export default App;
