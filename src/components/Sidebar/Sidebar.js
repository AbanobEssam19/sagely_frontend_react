import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../states/reducers/userSlice";
import { showAlert } from "../../states/reducers/alertSlice";

export const useSidebar = () => {
  const user = useSelector((state) => state.userData.data);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  async function logout() {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      localStorage.removeItem("token");
      dispatch(updateUser(null));
      dispatch(showAlert({ message: "Logout successfully!", type: "success" }));
      navigate("/");
    } else {
      dispatch(showAlert({ message: "Failed to logout!", type: "error" }));
    }
  }

  const items = useRef([]);

  function activate(ind) {
    for (let i = 0; i < 8; i++) {
      items.current[i].classList.remove("active");
    }
    items.current[ind].classList.add("active");
  }

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/")
      activate(0);
    else if (location.pathname.includes("announcement"))
      activate(1);
    else if (location.pathname.includes("course"))
      activate(2);
    else if (location.pathname.includes("chatbot"))
      activate(5);
    else if (location.pathname.includes("profile"))
      activate(6);
  }, [location])

  return {items, activate, user, logout};
}