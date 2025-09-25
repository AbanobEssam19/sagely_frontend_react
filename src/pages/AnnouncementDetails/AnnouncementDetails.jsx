import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/announcementDetails.css";
import { useAnnouncementDetails } from "./AnnouncementDetails";
import NotFoundPage from "../NotFound/NotFound";

function AnnouncementDetails() {
  const {announcement, course, formattedDate} = useAnnouncementDetails();

  if (!announcement) {
    return <NotFoundPage />;
  }

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
