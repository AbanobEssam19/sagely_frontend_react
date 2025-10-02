import React, { useState } from "react";
import "../../assets/css/profile.css";
import { useSelector } from "react-redux";
import { useInformation, useNotificationPreferences, useResetPassword } from "./Profile";
import NotFoundPage from "../NotFound/NotFound";
import Loading from "../Loading/Loading";

function Profile() {
  const user = useSelector((state) => state.userData.data);

  const [loading, setLoading] = useState(false);

  if (!user) 
    return <NotFoundPage />;

  if (loading)
    return <Loading />;

  return (
    <div className="profile">
      <div className="profile-header">
        <p>{user.name.split(" ").slice(0, 2).join(" ")}</p>
      </div>
      <Information setLoading={setLoading} />
      <Settings setLoading={setLoading} />
    </div>
  );
}

function Information({setLoading}) {
  const {
    editInfo,
    editBtn,
    user,
    phoneRef,
    setPhone,
    checkPhone,
    errorRef
  } = useInformation(setLoading);

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

function Settings({setLoading}) {
  return (
    <div className="section-container">
      <div className="section-header">
        <p>
          <i className="fas fa-cog"></i> <span>Account Settings</span>
        </p>
      </div>
      <form>
        <ResetPassword setLoading={setLoading} />
        <NotificationPreferences setLoading={setLoading} />
      </form>
    </div>
  );
}

function ResetPassword({setLoading}) {
  const {
    setShowModal,
    showModal,
    setOldPassword,
    errorRef,
    setNewPassword,
    setConfirmPassword,
    ChangePassword
  } = useResetPassword(setLoading);

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

function NotificationPreferences({setLoading}) {
  const {
    email,
    site,
    setShowModal,
    showModal,
    setEmailNotification,
    setSiteNotification,
    changeNotification
  } = useNotificationPreferences(setLoading);

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
