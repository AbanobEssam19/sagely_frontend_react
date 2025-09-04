import React from "react";
import "../assets/css/footer.css";
import graduateCap from "../assets/images/graduate-hat.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
        <div className="footer-container">
            <div className="top">
                <div className="logo">
                    <p>SAGE<span>LY</span></p>
                    <img src={graduateCap} alt="" />
                </div>
                <div className="links">
                    <Link to="">About</Link>
                    <Link to="">Contact</Link>
                    <Link to="">Privacy Policy</Link>
                    <Link to="">Terms of Service</Link>
                </div>
            </div>
            <div className="bottom">
                © 2025 Sagely - Cairo University. All rights reserved.
            </div>
        </div>
    </div>
  );
}

export default Footer;
