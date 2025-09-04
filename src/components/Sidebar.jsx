import React from "react";
import "../assets/css/sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../states/reducers/userSlice";
import { showAlert } from "../states/reducers/alertSlice";

function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarMenu />
    </div>
  );
}

function SidebarMenu() {
  const user = useSelector((state) => state.userData.data);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  async function logout() {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      localStorage.removeItem("token");
      dispatch(updateUser(null));
      dispatch(showAlert({ message: "Logout successfully!", type: "success" }));
      navigate("/");
    } else {
      dispatch(showAlert({ message: "Failed to logout!", type: "error" }));
    }
  }
  return (
    <ul className="sidebar-menu">
      <li className="active">
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
      <li className="">
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
        <Link to={user ? "/profile" : "/login"}>
          <i className="fas fa-user"></i>{" "}
          <span>{user ? "Profile" : "Login"}</span>
        </Link>
      </li>
      <li style={user ? {} : { display: "none" }}>
        <Link to="" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
        </Link>
      </li>
    </ul>
  );
}

export default Sidebar;
