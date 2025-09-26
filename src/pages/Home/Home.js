import { useSelector } from "react-redux";

export function useHome() {
  const user = useSelector((state) => state.userData.data);

  let welcome = "Welcome to Sagely!";
  let message = "";
  let announcementMessage = "";
  let courseMessage = "";
  let filesMessage = "";

  if (user) {
    welcome = `Welcome back, ${user.name.split(" ")[0]}!`;

    if (user.role === "Student") {
      message = "Here's what's happening with your postgraduate journey today.";
      announcementMessage = "Check the latest updates from your department.";
      courseMessage = "Review and manage your enrolled courses.";
      filesMessage = "Access and download your study materials and forms.";
    } 
    else {
      message = "Here's what's happening in the system today.";
      announcementMessage = "Stay updated with system-wide announcements.";
      courseMessage = "View and manage all available courses.";
      filesMessage = "Upload and manage official system documents.";
    }
  } else {
    welcome = "Welcome to Sagely!";
    message = "Sign in to explore your postgraduate resources and updates.";
    announcementMessage = "Log in to view announcements.";
    courseMessage = "Log in to explore available courses.";
    filesMessage = "Log in to access necessary files.";
  }

  const courses = useSelector((state) => state.courses.data);

  let announcements = useSelector((state) => state.announcements.data);

  const generalAnnouncements = announcements.filter(
    (announcement) => announcement.courseID === null
  );

  const courseAnnouncements = announcements.filter(
    (announcement) => announcement.courseID !== null
  );

  announcements = [...generalAnnouncements];

  const enrolledCourses = useSelector((state) => state.enrolledCourses.data);

  if (user && user.role === "Admin") {
    for (let i = 0; i < courseAnnouncements.length; ++i) {
      const course = courses.find(
        (course) => course.id === courseAnnouncements[i].courseID
      );
      if (course.adminid === user.id)
        announcements.push(courseAnnouncements[i]);
    }
  }
  else if (user && user.role === "Student") {
    for (let i = 0; i < courseAnnouncements.length; ++i) {
      if (enrolledCourses.find((course) => course.id == courseAnnouncements[i].courseID))
        announcements.push(courseAnnouncements[i]);
    }
  }

  announcements = [...announcements].sort(
    (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
  );


  return { welcome, message, announcementMessage, courseMessage, filesMessage, announcements };
}
