import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../states/APIs/userFetch";
import { showAlert } from "../../states/reducers/alertSlice";
import { setLoading } from "../../states/reducers/loadingSlice";

function useSignup() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userData.data);

  const loading = useSelector((state) => state.loading);

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const emailRegex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&#]{8,}$/;
  const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;

  const checkName = () => {
    const words = name.trim().split(" ").filter(Boolean);
    if (words.length < 3) {
      nameRef.current.style.display = "block";
      return false;
    }
    nameRef.current.style.display = "none";
    return true;
  };

  const checkEmail = () => {
    if (!emailRegex.test(email)) {
      emailRef.current.style.display = "block";
      return false;
    }
    emailRef.current.style.display = "none";
    return true;
  };

  const checkPhone = () => {
    if (!phoneRegex.test(phone)) {
      phoneRef.current.style.display = "block";
      return false;
    }
    phoneRef.current.style.display = "none";
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

  const checkConfirmPassword = () => {
    if (password !== confirmPassword) {
      confirmPasswordRef.current.style.display = "block";
      return false;
    }
    confirmPasswordRef.current.style.display = "none";
    return true;
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function signup(e) {
    e.preventDefault();
    if (
      !checkName() ||
      !checkEmail() ||
      !checkPhone() ||
      !checkPassword() ||
      !checkConfirmPassword()
    )
      return;

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phoneNumber: phone,
        password,
      }),
    });

    if (res.ok) {
      dispatch(showAlert({message: "Account created successfully!", type: "success"}));
      navigate("/login");
    }
    else {
      dispatch(showAlert({ type: "error", message: "Signup failed." }));
    }
  }

  return {
    setName,
    checkName,
    nameRef,
    setEmail,
    checkEmail,
    emailRef,
    setPhone,
    checkPhone,
    phoneRef,
    setPassword,
    checkPassword,
    passwordRef,
    setConfirmPassword,
    checkConfirmPassword,
    confirmPasswordRef,
    signup
  };
}

export {useSignup, useRightSide};