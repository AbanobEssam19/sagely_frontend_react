import React, { use } from "react";
import "../assets/css/login.css";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import graduationHat from "../assets/images/graduate-hat.png";
import { useState, useRef } from "react";

function Login() {
  return (
    <div className="login">
      <div className="login-container">
        <LeftSide />
        <RightSide />
      </div>
    </div>
  );
}

function LeftSide() {
  return (
    <div className="left-side">
      <img src={logo} alt="Study Illustration" className="illustration" />
      <h2>Welcome to Sagely</h2>
      <p>
        A centralized digital platform for managing courses, announcements,
        submission requirements, downloadable files, and student queries for the
        postgraduate department at Cairo University.
      </p>
    </div>
  );
}

function RightSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const emailRegex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&#]{8,}$/;


  const checkEmail = () => {
    if (!emailRegex.test(email)) {
      emailRef.current.style.display = "block";
      return false;
    }
    emailRef.current.style.display = "none";
    return true;
  };

  const checkPassword = () => {
    if (!passwordRegex.test(password)) {
      passwordRef.current.style.display = "block";
      return false;
    }
    passwordRef.current.style.display = "none";
    return true;
  }

  return (
    <div className="right-side">
      <div className="logo">
        SAGE<span>L</span> <span>Y</span>
        <img src={graduationHat} alt="Graduation Cap" />
      </div>

      <div className="form">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required
          onChange={(e) => setEmail(e.target.value)}
          onBlur={checkEmail}
        />
        <p className="errorMsg" ref={emailRef}>
          Please enter a valid email!
        </p>

        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          required
          onChange={(e) => setPassword(e.target.value)}
          onBlur={checkPassword}
        />
        <p className="errorMsg" ref={passwordRef}>Wrong email or password!</p>

        <div className="forgot">
          <Link to="#">Forgot password?</Link>
        </div>

        <button>Login</button>

        <div className="signup-btn">
          New here? <Link to="/signup">Create an Account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
