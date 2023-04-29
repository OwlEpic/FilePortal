import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./style.scss"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Single from "./pages/Single"
import Phone from "./pages/Phone"
import Header from "./components/Header"

const router = createBrowserRouter([
  {
    path: "/register",
    element: <div>
      <Header />
      <Register />
    </div>,
  },
  {
    path: "/login",
    element: <div>
    <Header />
    <Login />
  </div>,
  },
  {
    path: "/",
    element: <div>
      <Header />
      <Home />
    </div>,
  },
  {
    path: "/single",
    element: <div>
      <Header />
      <Single />
    </div>,
  },
  {
    path: "/phone",
    element: <div>
      <Header />
      <Phone />
    </div>,
  },
])

function App() {

  return (
    <div>
      <div className="app">
        <body>
        <div class="stars">
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
        </div>
        </body>
        <div className="container">  
          <RouterProvider router={router} />
        </div>
      </div>
    </div>
  );
}

export default App