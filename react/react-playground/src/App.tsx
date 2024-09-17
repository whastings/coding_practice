import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home/Home";
import React19Forms from "./routes/react-19-forms/React19Forms";
import UseDeferredValue from "./routes/useDeferredValue/UseDeferredValue";
import UseOptimistic from "./routes/UseOptimistic/UseOptimistic";
import UseTransition from "./routes/UseTransition/UseTransition";

const router = createBrowserRouter([
  {
    Component: Home,
    path: "/",
  },
  {
    Component: React19Forms,
    path: "/react-19-forms",
  },
  {
    Component: UseDeferredValue,
    path: "/useDeferredValue",
  },
  {
    Component: UseOptimistic,
    path: "/useOptimistic",
  },
  {
    Component: UseTransition,
    path: "/useTransition",
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
