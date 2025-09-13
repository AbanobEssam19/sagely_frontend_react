import React from "react";
import "../../assets/css/customDropdown.css";
import { useCustomDropdown } from "./CustomDropdown";

function CustomDropdown({ options, value, onChange, placeholder }) {

  const {open, selectedOption, dropdownRef, setOpen} = useCustomDropdown(options, value);

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
