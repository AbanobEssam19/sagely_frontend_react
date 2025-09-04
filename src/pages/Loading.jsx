import React from "react";
import "../assets/css/loading.css";

function Loading() {
  return (
    <div className="loading">
      <div className="loading-container">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
