import React from "react";
import "../../assets/css/notifications.css";
import { useNotification, useNotifications } from "./Notifications";

function Notifications() {
  const { notifications } = useNotifications();

  if (!notifications) {
    return <div>not logged in</div>;
  }
  return (
    <div className="notifications">
      <div className="notifications-header">
        <i className="fas fa-bell"></i>
        <h1>Notifications</h1>
      </div>
      <div className="notifications-container">
        {notifications &&
          notifications.map((notification) => (
            <Notification key={notification.id} notification={notification} />
          ))}
      </div>
    </div>
  );
}

function Notification({ notification }) {
  const { read } = useNotification();
  return (
    <div
      className={`notification ${
        notification.status === "Unread" ? "unread" : ""
      }`}
    >
      <div className="left">
        <p>{notification.message}</p>
      </div>
      <div className="right">
        <span>{notification.type}</span>
        {notification.status === "Unread" && (
          <button onClick={() => read(notification.id)}>Mark as Read</button>
        )}
      </div>
    </div>
  );
}

export default Notifications;
