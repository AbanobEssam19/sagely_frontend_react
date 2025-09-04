import React from 'react';
import '../assets/css/header.css';
import graduateCap from '../assets/images/graduate-hat.png';



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
            <p>Abanob Essam</p>
        </div>
    )
}

export default Header;