import { useState, useRef, useEffect } from "react";

export const useCustomDropdown = (options, value) => {
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

  return {open, selectedOption, dropdownRef, setOpen};
}