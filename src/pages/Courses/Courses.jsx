import React from "react";
import "../../assets/css/courses.css";
import Course from "../../components/Course/Course.jsx";
import { Link } from "react-router-dom";
import { useCourses } from "./Courses.js";

function Courses() {
  const {
    user,
    pageCount,
    pagination,
    currentPage,
    setCurrentPage,
    currentCourses,
    showEnrolledOnly,
    setShowEnrolledOnly
  } = useCourses();

  return (
    <div className="courses">
      <div className="courses-header">
        <p>
          <i className="fa-solid fa-book"></i> Courses
        </p>
        {user && user.role !== "Student" && (
          <Link to="/courses/create">
            <i className="fa-solid fa-plus"></i> <span>Add Course</span>
          </Link>
        )}
        {/* 🔹 Checkbox only for Students */}
      {user && user.role === "Student" && (
        <div className="courses-filter">
          <label>
            <input
              type="checkbox"
              checked={showEnrolledOnly}
              onChange={(e) => setShowEnrolledOnly(e.target.checked)}
            />{" "}
            Enrolled Only
          </label>
        </div>
      )}
      </div>

      

      <div className="courses-container">
        {currentCourses.map((course) => (
          <Course key={course.id} course={course} />
        ))}
      </div>

      <div>
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          </li>
          {pagination}
          <li className="page-item">
            <button
              className="page-link"
              onClick={() =>
                setCurrentPage(Math.min(currentPage + 1, pageCount - 1))
              }
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Courses;
