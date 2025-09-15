import React from "react";
import "../../assets/css/announcements.css";
import Announcement from "../../components/Announcement/Announcement.jsx";
import { Link } from "react-router-dom";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.jsx";
import { useAnnouncements } from "./Announcements.js";

function Announcements() {
  const {
    user,
    setSearchValue,
    courses,
    courseFilter,
    setCourseFilter,
    currentAnnouncements,
    setCurrentPage,
    currentPage,
    pagination,
    pageCount,
  } = useAnnouncements();

  return (
    <div className="announcements">
      <div className="announcements-header">
        <p>
          <i className="fa-solid fa-bullhorn"></i> Announcements
        </p>
        <Link
          to="/announcements/create"
          style={!user || user.role === "Student" ? { display: "none" } : {}}
        >
          <i className="fa-solid fa-plus"></i> <span>Add Announcement</span>
        </Link>
      </div>
      <div className="announcements-controls">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search announcements..."
            onBlur={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && setSearchValue(e.target.value.toLowerCase())
            }
          />
        </div>
        <div className="filter-dropdown">
          <CustomDropdown
            options={[
              { value: 0, label: "All Courses" },
              { value: null, label: "General" },
              ...courses.map((course) => ({
                value: course.id,
                label: course.name,
              })),
            ]}
            value={courseFilter}
            onChange={(val) => setCourseFilter(val)}
            placeholder="Select course"
          />
        </div>
      </div>
      <div className="announcements-container">
        {currentAnnouncements.map((announcement) => (
          <Announcement key={announcement.id} announcement={announcement} />
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

export default Announcements;
