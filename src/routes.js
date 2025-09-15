import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import NotFoundPage from "./pages/NotFound/NotFound.jsx";
import Courses from "./pages/Courses/Courses.jsx";
import Announcements from "./pages/Announcements/Announcements.jsx";
import AddAnnouncement from "./pages/AddAnnouncement/AddAnnouncement.jsx";
import EditAnnouncement from "./pages/EditAnnouncement/EditAnnouncement.jsx";
import AnnouncementDetails from "./pages/AnnouncementDetails/AnnouncementDetails.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Chatbot from "./pages/Chatbot/Chatbot.jsx";

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
      },
      {
        path: "/announcements",
        element: <Announcements />
      },
      {
        path: "/announcements/create",
        element: <AddAnnouncement />
      },
      {
        path: "/announcements/:id/edit",
        element: <EditAnnouncement />
      },
      {
        path: "/announcements/:id",
        element: <AnnouncementDetails />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/chatbot",
        element: <Chatbot />
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
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);
