import React from "react";
import "../../assets/css/home.css";
import { useHome } from "./Home";
import { Link } from "react-router-dom";

function Home() {
  const {
    welcome,
    message,
    announcementMessage,
    courseMessage,
    filesMessage,
    announcements,
  } = useHome();
  return (
    <div className="home-main-content">
      <div className="home-welcome-banner">
        <h1>{welcome}</h1>
        <p>{message}</p>
      </div>

      <div className="home-cards-container">
        <div className="home-card">
          <div className="home-card-header">
            <h3>Announcements</h3>
            <i className="fas fa-bullhorn"></i>
          </div>
          <div className="home-card-content">
            <p>{announcementMessage}</p>
            <Link className="home-card-btn" to="/announcements">View All</Link>
          </div>
        </div>

        <div className="home-card">
          <div className="home-card-header">
            <h3>Courses</h3>
            <i className="fas fa-book"></i>
          </div>
          <div className="home-card-content">
            <p>{courseMessage}</p>
            <Link className="home-card-btn" to="/courses">View Courses</Link>
          </div>
        </div>

        <div className="home-card">
          <div className="home-card-header">
            <h3>Files</h3>
            <i className="fas fa-file-download"></i>
          </div>
          <div className="home-card-content">
            <p>{filesMessage}</p>
            <Link className="home-card-btn" to="/files">View Files</Link>
          </div>
        </div>
      </div>

      <div className="home-announcements">
        <h2 className="home-section-title">
          <i className="fas fa-bell"></i> Latest Announcements
        </h2>
        {announcements.slice(0, 3).map((announcement, index) => {
          const date = new Date(announcement.publishDate);

          const formattedDate = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }).format(date);

          return (
            <div key={index} className="home-announcement-item">
              <h3 className="home-announcement-title">
                <i className="fas fa-circle"></i> {announcement.title}
              </h3>
              <p className="home-announcement-date">{formattedDate}</p>
              <p className="home-announcement-content">
                {announcement.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;