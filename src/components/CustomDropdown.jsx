import React, { useState, useRef, useEffect } from "react";
import "../assets/css/customDropdown.css";

function CustomDropdown({ options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // close menu if clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div
        className="custom-dropdown-selected"
        onClick={() => setOpen(!open)}
      >
        <p>{selectedOption ? selectedOption.label : placeholder}</p>
        <i className="fa-solid fa-chevron-down"></i>
      </div>

      {open && (
        <ul className="custom-dropdown-menu">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`custom-dropdown-item ${
                opt.value === value ? "active" : ""
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomDropdown;
