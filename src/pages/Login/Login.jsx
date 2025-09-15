import React from "react";
import "../../assets/css/login.css";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import graduationHat from "../../assets/images/graduate-hat.png";
import NotFoundPage from "../NotFound/NotFound.jsx";
import Loading from "../Loading/Loading.jsx";
import { useLogin, useRightSide } from "./Login.js";

function Login() {
  const {loading, user} = useLogin();
  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <NotFoundPage />;
  }

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
  const {
    setEmail,
    checkEmail,
    emailRef,
    setPassword,
    checkPassword,
    passwordRef,
    login
  } = useRightSide();

  return (
    <div className="right-side">
      <div className="logo">
        SAGE<span>L</span> <span>Y</span>
        <img src={graduationHat} alt="Graduation Cap" />
      </div>

      <form className="form">
        <label htmlFor="email">Email</label>
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

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          required
          onChange={(e) => setPassword(e.target.value)}
          onBlur={checkPassword}
        />
        <p className="errorMsg" ref={passwordRef}>
          Wrong email or password!
        </p>

        <div className="forgot">
          <Link to="#">Forgot password?</Link>
        </div>

        <button type="submit" onClick={login}>Login</button>

        <div className="signup-btn">
          New here? <Link to="/signup">Create an Account</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
