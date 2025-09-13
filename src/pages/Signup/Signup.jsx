import React from "react";
import "../../assets/css/signup.css";
import logo from "../../assets/images/logo.png";
import graduationHat from "../../assets/images/graduate-hat.png";
import { Link } from "react-router-dom";
import NotFoundPage from "../NotFound/NotFound";
import Loading from "../Loading/Loading";
import { useRightSide, useSignup } from "./Signup";

function Signup() {
  const {loading, user} = useSignup();

  if (loading) return <Loading />;

  if (user) {
    return <NotFoundPage />;
  }

  return (
    <div className="signup">
      <div className="signup-container">
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
      <h2>Join Sagely</h2>
      <p>
        Create your account to access courses, announcements, submit
        requirements, download files, and send queries to the postgraduate
        department at Cairo University.
      </p>
    </div>
  );
}

function RightSide() {
  const {
    setName,
    checkName,
    nameRef,
    setEmail,
    checkEmail,
    emailRef,
    setPhone,
    checkPhone,
    phoneRef,
    setPassword,
    checkPassword,
    passwordRef,
    setConfirmPassword,
    checkConfirmPassword,
    confirmPasswordRef,
    signup
  } = useRightSide();

  return (
    <div className="right-side">
      <div className="logo">
        SAGE<span>L</span> <span>Y</span>
        <img src={graduationHat} alt="Graduation Cap" />
      </div>

      <form className="form">
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          id="fullname"
          placeholder="Enter your full name"
          required
          onChange={(e) => setName(e.target.value)}
          onBlur={checkName}
        />
        <p className="errorMsg" ref={nameRef}>
          Full name must be at least three words!
        </p>

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
          Email is not valid!
        </p>

        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          id="phone"
          placeholder="Enter your phone number"
          required
          onChange={(e) => setPhone(e.target.value)}
          onBlur={checkPhone}
        />
        <p className="errorMsg" ref={phoneRef}>
          Phone number is not valid!
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
          Password must be at least 8 characters, include at least one uppercase
          letter, lowercase letter, and digit.
        </p>

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          placeholder="Confirm your password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={checkConfirmPassword}
        />
        <p className="errorMsg" ref={confirmPasswordRef}>
          Passwords do not match!
        </p>

        <button type="submit" onClick={signup}>Sign Up</button>

        <div className="login-btn">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
