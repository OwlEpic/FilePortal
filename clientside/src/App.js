import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import "./style.scss"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Single from "./pages/Single"

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/single",
    element: <Single />,
  },
])

// <RouterProvider router={router} /> for later :)
function App() {

  return (
    <div>
      <div className="app">
        <div className="container">  
          <RouterProvider router={router} />
        </div>
      </div>
    </div>
  );
}

export default App