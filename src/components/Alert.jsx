import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearAlert } from "../states/reducers/alertSlice";
import "../assets/css/alert.css";

function Alert() {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.alert);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  return (
    <div className={`nf-toast nf-toast-${type}`}>
      <span>{message}</span>
      <button
        className="nf-toast-close"
        onClick={() => dispatch(clearAlert())}
      >
        ✕
      </button>
    </div>
  );
}

export default Alert;
