import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home/Home";
import React19Forms from "./routes/react-19-forms/React19Forms";

const router = createBrowserRouter([
  {
    Component: Home,
    path: "/",
  },
  {
    Component: React19Forms,
    path: "/react-19-forms",
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
