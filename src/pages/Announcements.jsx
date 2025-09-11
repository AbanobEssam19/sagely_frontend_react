import React, { useEffect, useState } from "react";
import "../assets/css/announcements.css";
import Announcement from "../components/Announcement";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomDropdown from "../components/CustomDropdown";

function Announcements() {
  const user = useSelector((state) => state.userData.data);

  const courses = useSelector((state) => state.courses.data);

  let announcements = useSelector((state) => state.announcements.data);

  const generalAnnouncements = announcements.filter(
    (announcement) => announcement.courseID === null
  );

  const courseAnnouncements = announcements.filter(
    (announcement) => announcement.courseID !== null
  );

  announcements = [...generalAnnouncements];

  if (user && user.role === "Admin") {
    for (let i = 0; i < courseAnnouncements.length; ++i) {
      const course = courses.find(
        (course) => course.id === courseAnnouncements[i].courseID
      );
      if (course.adminid === user.id)
        announcements.push(courseAnnouncements[i]);
    }
  }

  announcements = [...announcements].sort(
    (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
  );

  const [searchValue, setSearchValue] = useState("");
  const [courseFilter, setCourseFilter] = useState(0);

  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);

  useEffect(() => {
    setFilteredAnnouncements(
      announcements.filter(
        (announcement) =>
          announcement.title.toLowerCase().includes(searchValue) &&
          (courseFilter === 0 || announcement.courseID === courseFilter)
      )
    );
    // eslint-disable-next-line
  }, [searchValue, courseFilter]);

  const pageSize = 3;
  let pageCount;

  const [currentPage, setCurrentPage] = useState(0);

  const [currentAnnouncements, setCurrentAnnouncements] = useState([]);

  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line
    pageCount = Math.ceil(filteredAnnouncements.length / pageSize);
    setCurrentAnnouncements(
      filteredAnnouncements.slice(
        currentPage * pageSize,
        Math.min(filteredAnnouncements.length, (currentPage + 1) * pageSize)
      )
    );

    let temp = [];
    for (let i = 0; i < pageCount; ++i) {
      temp.push(
        <li className="page-item" key={i}>
          <button
            className={`page-link ${currentPage === i ? "active" : ""}`}
            onClick={() => setCurrentPage(i)}
          >
            {i + 1}
          </button>
        </li>
      );
    }
    setPagination(temp);
    // eslint-disable-next-line
  }, [currentPage, filteredAnnouncements]);

  return (
    <div className="announcements">
      <div className="announcements-header">
        <p>
          <i className="fa-solid fa-bullhorn"></i> Announcements
        </p>
        <Link to="/announcements/create">
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
              e.key === "Enter" && setSearchValue(e.target.value)
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
                label: course.name
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
