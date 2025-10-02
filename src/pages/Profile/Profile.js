import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../states/reducers/alertSlice";

function useInformation(setLoading) {
  const user = useSelector((state) => state.userData.data);
  const phoneRef = useRef(null);
  const [phone, setPhone] = useState(user.phoneNumber);

  const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;
  const errorRef = useRef(null);

  const editBtn = useRef(null);

  const dispatch = useDispatch();

  function checkPhone() {
    const check = phoneRegex.test(phone) ? true : false;
    errorRef.current.style.display = check ? "none" : "block";
    return check;
  }

  async function saveInfo() {
    if (!checkPhone()) return false;

    const token = localStorage.getItem("token");

    setLoading(true);

    const res = await fetch("/api/profile/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        phoneNumber: phone,
      }),
    });

    setLoading(false);

    if (res.ok) {
      dispatch(
        showAlert({ message: "Profile Updated Successfuly", type: "success" })
      );
      setTimeout(() => {
        window.location.href = "/profile";
      }, 600);
      return true;
    } else {
      dispatch(
        showAlert({ message: "Failed to Update Profile!", type: "error" })
      );
      return false;
    }
  }

  async function editInfo() {
    const edit = phoneRef.current.disabled;
    if (edit) {
      editBtn.current.innerHTML = `<i class="fas fa-check"></i>Save`;
      phoneRef.current.disabled = false;
      phoneRef.current.style.borderBottom = "1px solid #777";
    } else {
      await saveInfo();
    }
  }
  
  return {
    editInfo,
    editBtn,
    user,
    phoneRef,
    setPhone,
    checkPhone,
    errorRef
  }
}

function useResetPassword(setLoading) {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const errorRef = useRef([]);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&#]{8,}$/;

  function check() {
    let value = true;

    if (!passwordRegex.test(oldPassword)) {
      errorRef.current[0].style.display = "block";
      value = false;
    }
    else
      errorRef.current[0].style.display = "none";

    if (!passwordRegex.test(newPassword)) {
      errorRef.current[1].style.display = "block";
      value = false;
    }
    else
      errorRef.current[1].style.display = "none";

    if (newPassword !== confirmPassword) {
      errorRef.current[2].style.display = "block";
      value = false;
    }
    else
      errorRef.current[2].style.display = "none";

    return value;
  }

  async function ChangePassword() {
    if (!check())
      return;

    const token = localStorage.getItem("token");

    setLoading(true);

    const res = await fetch("/api/change-password", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });

    setLoading(false);

    if (res.ok) {
      dispatch(
        showAlert({ message: "Password Changed Successfuly", type: "success" })
      );
      setTimeout(() => {
        window.location.href = "/profile";
      }, 600);
    } else {
      dispatch(
        showAlert({ message: "Failed to Change Password!", type: "error" })
      );
      errorRef.current[0].style.display = "block";
    }
  }

  return {
    setShowModal,
    showModal,
    setOldPassword,
    errorRef,
    setNewPassword,
    setConfirmPassword,
    ChangePassword
  }
}

function useNotificationPreferences(setLoading) {
  const [showModal, setShowModal] = useState(false);

  const user = useSelector((state) => state.userData.data);

  const email = user.emailNotificationPreferences;
  const site = user.siteNotificationPreferences;

  const [emailNotification, setEmailNotification] = useState(email);
  const [siteNotification, setSiteNotification] = useState(site);

  const dispatch = useDispatch();

  async function changeNotification() {
    const token = localStorage.getItem("token");

    setLoading(true);

    const res = await fetch("/api/profile/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        emailNotificationPreferences: emailNotification,
        siteNotificationPreferences: siteNotification,
      }),
    });

    setLoading(false);

    if (res.ok) {
      dispatch(
        showAlert({ message: "Profile Updated Successfuly", type: "success" })
      );
      setTimeout(() => {
        window.location.href = "/profile";
      }, 600);
      return true;
    } else {
      dispatch(
        showAlert({ message: "Failed to Update Profile!", type: "error" })
      );
      return false;
    }
  }

  return {
    email,
    site,
    setShowModal,
    showModal,
    setEmailNotification,
    setSiteNotification,
    changeNotification
  };
}

export {useInformation, useResetPassword, useNotificationPreferences};