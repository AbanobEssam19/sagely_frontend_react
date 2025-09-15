import React from "react";
import { useAlert } from "./Alert.js";
import "../../assets/css/alert.css";

function Alert() {
  const { message, type, onClose } = useAlert();

  if (!message) return null;

  return (
    <div className={`nf-toast nf-toast-${type}`}>
      <span>{message}</span>
      <button className="nf-toast-close" onClick={onClose}>
        ✕
      </button>
    </div>
  );
}

export default Alert;
