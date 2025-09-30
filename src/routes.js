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
import AddCourse from "./pages/AddCourse/AddCourse.jsx";
import EditCourse from "./pages/EditCourse/EditCourse.jsx";
import CourseDetails from "./pages/CourseDetails/CourseDetails.jsx";
import Enroll from "./pages/Enroll/Enroll.jsx";
import EnrollmentRequests from "./pages/EnrollmentRequests/EnrollmentRequests.jsx";
import ViewSubmission from "./pages/ViewSubmission/ViewSubmission.jsx";
import Notifications from "./pages/Notifications/Notifications.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
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
        path: "/courses/create",
        element: <AddCourse />
      },
      {
        path: "/courses/:id/edit",
        element: <EditCourse />
      },
      {
        path: "/courses/:id",
        element: <CourseDetails />
      },
      {
        path: "/courses/:id/enroll",
        element: <Enroll />
      },
      {
        path: "/courses/:id/requests",
        element: <EnrollmentRequests />
      },
      {
        path: "/courses/:courseId/requests/:studentId",
        element: <ViewSubmission />
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
      },
      {
        path: "/notifications",
        element: <Notifications />
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
