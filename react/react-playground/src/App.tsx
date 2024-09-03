import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home/Home";

const router = createBrowserRouter([
  {
    Component: Home,
    path: "/",
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
