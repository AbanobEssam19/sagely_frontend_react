import React from 'react'
import '../assets/css/header.css'


function Header() {
  return (
    <main>
        <div className='container'>
            <Logo />
            <Username />
        </div>
    </main>
  )
}

function Logo() {
    return (
        <div className='logo'>
            <p>SAGE<span>LY</span></p>
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