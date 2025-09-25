import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/courseDetails.css";
import { useCourseDetails } from "./CourseDetails";
import NotFoundPage from "../NotFound/NotFound";

function CourseDetails() {
  const { course, user } = useCourseDetails();

  if (!course) {
    return <NotFoundPage />;
  }

  return (
    <div className="course-details">
      <div className="course-title">
        <div className="icon-container">
          <i className="fa-solid fa-book"></i>
        </div>
        <p>{course.name}</p>
      </div>
      <div className="course-area">
        <div className="course-content">{course.description}</div>

        <div className="btn-container">
          <Link className="back-btn" to="/courses">
            <i className="fa-solid fa-backward-step"></i>
            <span>Back</span>
          </Link>
          <Link
            className="enroll-btn"
            to={`/courses/${course.id}/enroll`}
            style={!user || user.role === "Admin" ? { display: "none" } : {}}
          >
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
            <span>Enroll</span>
          </Link>
          <Link
            className="view-enrollments-btn"
            to={`/courses/${course.id}/requests`}
            style={!user || user.role === "Student" ? { display: "none" } : {}}
          >
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
            <span>View Enrollments</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
