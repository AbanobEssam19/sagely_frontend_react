import React from 'react';
import '../assets/css/header.css';
import graduateCap from '../assets/images/graduate-hat.png';
import { Link } from 'react-router-dom';



function Header() {
  return (
    <div className='header'>
        <div className='header-container'>
            <Logo />
            <Username />
        </div>
    </div>
  )
}

function Logo() {
    return (
        <div className='logo'>
            <p>SAGE<span>LY</span></p>
            <img src={graduateCap} alt="" />
        </div>
    )
}

function Username() {
    return (
        <div className='username'>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Header;