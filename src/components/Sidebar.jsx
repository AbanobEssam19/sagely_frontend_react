import React, { useEffect, useRef } from "react";
import "../assets/css/sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

  const items = useRef([]);

  function activate(ind) {
    for (let i = 0; i < 8; i++) {
      items.current[i].classList.remove("active");
    }
    items.current[ind].classList.add("active");
  }

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/")
      activate(0);
    else if (location.pathname.includes("announcement"))
      activate(1);
    else if (location.pathname.includes("course"))
      activate(2);
    else if (location.pathname.includes("profile") && user)
      activate(6);
  }, [location])

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
        <Link to="">
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
