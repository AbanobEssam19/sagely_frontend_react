import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFoundPage from "./pages/NotFound";
import Courses from "./pages/Courses";

export const router = createBrowserRouter([
  {
    path: "/", // parent route
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/courses",
        element: <Courses />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/error",
    element: <NotFoundPage />
  }
]);
