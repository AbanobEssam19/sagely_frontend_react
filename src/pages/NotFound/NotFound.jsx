import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/notFound.css";

export default function NotFoundPage() {
  return (
    <div className="nf-container">
        <div className="nf-content">
          <h1 className="nf-title">404</h1>
          <p className="nf-subtitle">
            Oops — the page you're looking for doesn't exist.
          </p>

          <p className="nf-description">
            It may have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="nf-buttons">
            <Link to="/" className="nf-btn nf-btn-primary">
              Go to Homepage
            </Link>
          </div>

          <div className="nf-tip">
            Tip: try checking the URL for typos or head back to the homepage.
          </div>
        </div>
    </div>
  );
}
