import React from "react";
import "../assets/css/signup.css";
import logo from "../assets/images/logo.png";
import graduationHat from "../assets/images/graduate-hat.png";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";


function Signup() {
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const emailRegex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&#]{8,}$/;
  const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;

  const checkName = () => {
    if (name == "") {
        nameRef.current.style.display = "block";
        return false;
    }
    nameRef.current.style.display = "none";
    return true;
  }

  const checkEmail = () => {
    if (!emailRegex.test(email)) {
      emailRef.current.style.display = "block";
      return false;
    }
    emailRef.current.style.display = "none";
    return true;
  }

  const checkPhone = () => {
    if (!phoneRegex.test(phone)) {
      phoneRef.current.style.display = "block";
      return false;
    }
    phoneRef.current.style.display = "none";
    return true;
  }

  const checkPassword = () => {
    if (!passwordRegex.test(password)) {
      passwordRef.current.style.display = "block";
      return false;
    }
    passwordRef.current.style.display = "none";
    return true;
  }

  const checkConfirmPassword = () => {
    if (password != confirmPassword) {
      confirmPasswordRef.current.style.display = "block";
      return false;
    }
    confirmPasswordRef.current.style.display = "none";
    return true;
  }

  return (
    <div className="right-side">
      <div className="logo">
        SAGE<span>L</span> <span>Y</span>
        <img src={graduationHat} alt="Graduation Cap" />
      </div>

      <div className="form">
        <label for="fullname">Full Name</label>
        <input
          type="text"
          id="fullname"
          placeholder="Enter your full name"
          required
          onChange={(e) => setName(e.target.value)}
          onBlur={checkName}
        />
        <p className="errorMsg" ref={nameRef}>Name can not be empty!</p>

        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required
          onChange={(e) => setEmail(e.target.value)}
          onBlur={checkEmail}
        />
        <p className="errorMsg" ref={emailRef}>Email is not valid!</p>

        <label for="phone">Phone Number</label>
        <input
          type="text"
          id="phone"
          placeholder="Enter your phone number"
          required
          onChange={(e) => setPhone(e.target.value)}
          onBlur={checkPhone}
        />
        <p className="errorMsg" ref={phoneRef}>Phone number is not valid!</p>

        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          required
          onChange={(e) => setPassword(e.target.value)}
          onBlur={checkPassword}
        />
        <p className="errorMsg" ref={passwordRef}>Password must be at least 8 characters, include at least one uppercase letter, lowercase letter, and digit.</p>

        <label for="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          placeholder="Confirm your password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={checkConfirmPassword}
        />
        <p className="errorMsg" ref={confirmPasswordRef}>Passwords do not match!</p>

        <button>Sign Up</button>

        <div className="login-btn">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
