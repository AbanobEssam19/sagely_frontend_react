import React, { useRef, useState } from "react";
import "../assets/css/profile.css";
import { useDispatch, useSelector } from "react-redux";
import NotFoundPage from "./NotFound";
import { showAlert } from "../states/reducers/alertSlice";

function Profile() {
  const user = useSelector((state) => state.userData.data);

  if (!user) return <NotFoundPage />;
  return (
    <div className="profile">
      <div className="profile-header">
        <p>{user.name.split(" ").slice(0, 2).join(" ")}</p>
      </div>
      <Information />
      <Settings />
    </div>
  );
}

function Information() {
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
      if (await saveInfo()) {
        editBtn.current.innerHTML = `<i class="fas fa-edit"></i>Edit`;
        phoneRef.current.disabled = true;
      }
    }
  }
  return (
    <div className="section-container">
      <div className="section-header">
        <p>
          <i className="fas fa-user-circle"></i>
          <span>Personal Information</span>
        </p>
        <button onClick={async () => await editInfo()} ref={editBtn}>
          <i className="fas fa-edit"></i>Edit
        </button>
      </div>
      <form>
        <div className="form-field">
          <label>
            <strong>Full Name</strong>
          </label>
          <input type="text" value={user.name} disabled />
        </div>
        <div className="form-field">
          <label>
            <strong>Email</strong>
          </label>
          <input type="email" value={user.email} disabled />
        </div>
        <div className="form-field">
          <label>
            <strong>Phone Number</strong>
          </label>
          <input
            type="text"
            defaultValue={user.phoneNumber}
            disabled
            ref={phoneRef}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={checkPhone}
          />
          <p className="errorMsg" ref={errorRef}>
            Please enter a valid phone number!
          </p>
        </div>
      </form>
    </div>
  );
}

function Settings() {
  return (
    <div className="section-container">
      <div className="section-header">
        <p>
          <i className="fas fa-cog"></i> <span>Account Settings</span>
        </p>
      </div>
      <form>
        <ResetPassword />
        <NotificationPreferences />
      </form>
    </div>
  );
}

function ResetPassword() {
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

  return (
    <div className="form-field reset-password">
      <label>
        <strong>Password</strong>
      </label>
      <p>••••••••</p>
      <button type="button" onClick={() => setShowModal(true)}>
        <i className="fas fa-key"></i>
        <span>Change Password</span>
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="section-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Reset Password</h2>

            <div className="form">
              <div className="form-field">
                <label>Old Password</label>
                <input
                  type="password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <p className="errorMsg" ref={(e) => (errorRef.current[0] = e)}>
                  Password is incorrect!
                </p>
              </div>
              <div className="form-field">
                <label>New Password</label>
                <input
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <p className="errorMsg" ref={(e) => (errorRef.current[1] = e)}>
                  Password must be at least 8 characters, include at least one
                  uppercase letter, lowercase letter, and digit.
                </p>
              </div>
              <div className="form-field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <p className="errorMsg" ref={(e) => (errorRef.current[2] = e)}>
                  Passwords do not match!
                </p>
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                type="button"
                className="save-btn"
                onClick={ChangePassword}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationPreferences() {
  const [showModal, setShowModal] = useState(false);

  const user = useSelector((state) => state.userData.data);

  const email = user.emailNotificationPreferences;
  const site = user.siteNotificationPreferences;

  const [emailNotification, setEmailNotification] = useState(email);
  const [siteNotification, setSiteNotification] = useState(site);

  const dispatch = useDispatch();

  async function changeNotification() {
    const token = localStorage.getItem("token");

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

  return (
    <div className="form-field notification-field">
      <label>
        <strong>Notification Preferences</strong>
      </label>
      <p>
        {email ? "Email " : ""}
        {email && site ? "& " : ""}
        {site ? "In-App " : ""}
        {!email && !site ? "Mute " : ""}Notifications
      </p>
      <button type="button" onClick={() => setShowModal(true)}>
        <i className="fas fa-bell"></i>
        <span>Manage Notifications</span>
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="section-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Manage Notifications</h2>

            <div className="form">
              <label>
                <input
                  type="checkbox"
                  defaultChecked={email}
                  onChange={(e) => setEmailNotification(e.target.checked)}
                />{" "}
                Email Notifications
              </label>
              <label>
                <input
                  type="checkbox"
                  defaultChecked={site}
                  onChange={(e) => setSiteNotification(e.target.checked)}
                />{" "}
                In-App Notifications
              </label>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                type="button"
                className="save-btn"
                onClick={changeNotification}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
