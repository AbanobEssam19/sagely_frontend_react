import { useEffect } from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../states/APIs/userFetch";
import { showAlert } from "../../states/reducers/alertSlice";
import { updateUser } from "../../states/reducers/userSlice";
import { setLoading } from "../../states/reducers/loadingSlice";

function useLogin() {
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userData.data);

  useEffect(() => {
    let token = localStorage.getItem("token");
    const fetchData = async () => {
      dispatch(setLoading(true));
      await dispatch(fetchUser(token));
      dispatch(setLoading(false));
    };

    fetchData();
  }, []);

  return {loading, user};
}

function useRightSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const emailRegex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&#]{8,}$/;

  const checkEmail = () => {
    if (!emailRegex.test(email)) {
      emailRef.current.style.display = "block";
      return false;
    }
    emailRef.current.style.display = "none";
    return true;
  };

  const checkPassword = () => {
    if (!passwordRegex.test(password)) {
      passwordRef.current.style.display = "block";
      return false;
    }
    passwordRef.current.style.display = "none";
    return true;
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function login(e) {
    e.preventDefault();
    if (!checkEmail() || !checkPassword()) return;

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      dispatch(showAlert({message: "Login successfully!", type: "success"}));
      dispatch(updateUser(data.user));
      navigate("/");
    } else {
      dispatch(showAlert({message: "Login failed.", type: "error"}));
      passwordRef.current.style.display = "block";
    }
  }

  return {
    setEmail,
    checkEmail,
    emailRef,
    setPassword,
    checkPassword,
    passwordRef,
    login
  };
}


export {useLogin, useRightSide};