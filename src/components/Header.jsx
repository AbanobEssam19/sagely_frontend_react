import React from "react";
import "../assets/css/header.css";
import graduateCap from "../assets/images/graduate-hat.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  return (
    <div className="header">
      <div className="header-container">
        <Logo />
        <Username />
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <p>
        SAGE<span>LY</span>
      </p>
      <img src={graduateCap} alt="" />
    </div>
  );
}

function Username() {
  const user = useSelector((state) => state.userData.data);
  return (
    <div className="username">
      <Link to={user ? "/profile" : "/login"}>
        {user ? user.name.split(" ").slice(0, 2).join(" ") : "Login / Signup"}
      </Link>
    </div>
  );
}

export default Header;
