import React from 'react';
import '../assets/css/login.css';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import graduationHat from '../assets/images/graduate-hat.png';

function Login() {
  return (
    <div className='login'>
        <div className='login-container'>
            <LeftSide />
            <RightSide />
        </div>
    </div>
   
  )
}

function LeftSide() {
    return (
        <div className="left-side">
            <img src={logo} alt="Study Illustration" className="illustration" />
            <h2>Welcome to Sagely</h2>
            <p>
                A centralized digital platform for managing courses, announcements, submission requirements, downloadable files, 
                and student queries for the postgraduate department at Cairo University.
            </p>
        </div>
    )
}

function RightSide() {
    return (
        <div className="right-side">
            <div className="logo">
                SAGE<span>L</span> <span>Y</span><img src={graduationHat} alt="Graduation Cap" />
            </div>

            <form>
                <label for="username">Email</label>
                <input type="text" id="username" placeholder="Enter your email" required />

                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" required />

                <div className="forgot"><Link to="#">Forgot password?</Link></div>

                <button type="submit">Login</button>

                <div className="signup">
                    New here? <Link to="">Create an Account</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;