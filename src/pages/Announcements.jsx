import React, { useEffect, useState } from "react";
import "../assets/css/announcements.css";
import Announcement from "../components/Announcement";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Announcements() {
  const user = useSelector((state) => state.userData.data);

  const courses = useSelector((state) => state.courses.data);

  let announcements = useSelector((state) => state.announcements.data);

  const generalAnnouncements = announcements.filter((announcement) => announcement.courseID === null);

  const courseAnnouncements = announcements.filter((announcement) => announcement.courseID !== null);

  announcements = [...generalAnnouncements];

  if (user && user.role === "Admin") {
    for (let i = 0; i < courseAnnouncements.length; ++i) {
      const course = courses.find((course) => course.id === courseAnnouncements[i].courseID);
      if (course.adminid === user.id)
        announcements.push(courseAnnouncements[i]);
    }
  }

  announcements = [...announcements].sort(
    (a, b) => new Date(b.publishDate) - new Date(a.publishDate) // newest first
  );

  const pageSize = 3;
  const pageCount = Math.ceil(announcements.length / pageSize);

  const [currentPage, setCurrentPage] = useState(0);

  const [currentAnnouncements, setCurrentAnnouncements] = useState([]);

  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    setCurrentAnnouncements(announcements.slice(currentPage * pageSize, Math.min(announcements.length, (currentPage + 1) * pageSize)));

    let temp = [];
    for (let i = 0; i < pageCount; ++i) {
      temp.push(
       <li className="page-item" key={i}>
          <button className={`page-link ${currentPage === i ? "active": ""}`} onClick={() => setCurrentPage(i)}>{i + 1}</button>
       </li>
      )
    };
    setPagination(temp);
    // eslint-disable-next-line
  }, [currentPage, pageCount]);

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
      <div className="announcements-container">
        {
          currentAnnouncements.map((announcement) => 
            <Announcement key={announcement.id} announcement={announcement} />
          )
        }
      </div>
      <div>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}>
              <i className="fas fa-chevron-left"></i>
            </button>
          </li>
          {
            pagination
          }
          <li className="page-item">
            <button className="page-link" onClick={() => setCurrentPage(Math.min(currentPage + 1, pageCount - 1))}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Announcements;
