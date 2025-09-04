import React from "react";
import "../assets/css/sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarMenu />
    </div>
  );
}

function SidebarMenu() {
  return (
    <ul className="sidebar-menu">
      <li className="">
        <Link to="">
          <i className="fas fa-tachometer-alt"></i> <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="">
          <i className="fas fa-bullhorn"></i> <span>Announcements</span>
        </Link>
      </li>
      <li>
        <Link to="">
          <i className="fa-solid fa-book"></i> <span>Courses</span>
        </Link>
      </li>
      <li className="active">
        <Link to="">
          <i className="fas fa-file-download"></i> <span>Files</span>
        </Link>
      </li>
      <li>
        <Link to="">
          <i className="fas fa-bell"></i> <span>Notifications</span>
        </Link>
      </li>
      <li>
        <Link to="">
          <i className="fas fa-robot"></i> <span>Chatbot</span>
        </Link>
      </li>
      <li>
        <Link to="/login">
          <i className="fas fa-user"></i> <span>Login</span>
        </Link>
      </li>
      <li style={{ display: "none" }}>
        <Link to="">
          <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
        </Link>
      </li>
    </ul>
  );
}

export default Sidebar;
