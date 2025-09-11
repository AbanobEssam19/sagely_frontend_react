// AnnouncementDetails.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../assets/css/announcementDetails.css";
import NotFoundPage from "./NotFound";

function AnnouncementDetails() {
  const { id } = useParams();

  const announcements = useSelector((state) => state.announcements.data);

  // eslint-disable-next-line
  const announcement = announcements.find((a) => a.id == id);
  
  const courses = useSelector((state) => state.courses.data);

  if (!announcement) {
    return <NotFoundPage />;
  }

  const course = courses.find((course) => course.id === announcement.courseID);

  const date = new Date(announcement.publishDate);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);

  return (
    <div className="announcement-details">
      <div className="announcement-title">
        <div className="icon-container"><i className="fa-solid fa-bullhorn"></i></div>
        <p>{announcement.title}</p>
      </div>
      <div className="announcement-area">
        <p className="announcement-info">
          <span>{course ? course.name : "General"}</span>|<span>{announcement.category}</span>|<span>{formattedDate}</span>
        </p>
      
        <div className="announcement-content">{announcement.content}</div>

        <div className="btn-container">
          <Link className="back-btn" to="/announcements">
            <i className="fa-solid fa-backward-step"></i><span>Back</span>
          </Link>
          <Link className="course-btn" style={!course ? {display: "none"} : {}} to={course ? `/courses/${course.id}` : ""}>
            <i className="fa-solid fa-book"></i><span>View Course</span>
          </Link>
        </div>
        
      </div>
    </div>
  );
}

export default AnnouncementDetails;
