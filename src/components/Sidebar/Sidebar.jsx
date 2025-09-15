import React from "react";
import "../../assets/css/sidebar.css";
import { Link } from "react-router-dom";
import { useSidebar } from "./Sidebar";

function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarMenu />
    </div>
  );
}

function SidebarMenu() {
  const {items, activate, user, logout} = useSidebar();

  return (
    <ul className="sidebar-menu">
      <li ref={(e) => items.current[0] = e} onClick={() => activate(0)}>
        <Link to="">
          <i className="fas fa-tachometer-alt"></i> <span>Dashboard</span>
        </Link>
      </li>
      <li ref={(e) => items.current[1] = e} onClick={() => activate(1)}>
        <Link to="/announcements">
          <i className="fas fa-bullhorn"></i> <span>Announcements</span>
        </Link>
      </li>
      <li ref={(e) => items.current[2] = e} onClick={() => activate(2)}>
        <Link to="/courses" >
          <i className="fa-solid fa-book"></i> <span>Courses</span>
        </Link>
      </li>
      <li ref={(e) => items.current[3] = e} onClick={() => activate(3)}>
        <Link to="">
          <i className="fas fa-file-download"></i> <span>Files</span>
        </Link>
      </li>
      <li ref={(e) => items.current[4] = e} onClick={() => activate(4)}>
        <Link to="">
          <i className="fas fa-bell"></i> <span>Notifications</span>
        </Link>
      </li>
      <li ref={(e) => items.current[5] = e} onClick={() => activate(5)}>
        <Link to="/chatbot">
          <i className="fas fa-robot"></i> <span>Chatbot</span>
        </Link>
      </li>
      <li ref={(e) => items.current[6] = e} onClick={() => activate(6)}>
        <Link to={user ? "/profile" : "/login"}>
          <i className="fas fa-user"></i>{" "}
          <span>{user ? "Profile" : "Login"}</span>
        </Link>
      </li>
      <li ref={(e) => items.current[7] = e} style={user ? {} : { display: "none" }} onClick={() => activate(7)}>
        <Link to="" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
        </Link>
      </li>
    </ul>
  );
}

export default Sidebar;
