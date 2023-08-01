import React from 'react';

import { Link } from 'react-router-dom';

function Notifications({ notifications }) {
  return (
    <div className="notifications-container">
      <h2 className="notifications-title">Notifications</h2>
      <Link to = "/"><div className="notifications-list">
        {notifications.map(notification => (
          <div key={notification.id} className="notification-item">
            <span className="notification-icon">{notification.icon}</span>
            <div className="notification-content">
              <span className="notification-title">{notification.title}</span>
              <p className="notification-message">{notification.message}</p>
            </div>
          </div>
        ))}
      </div></Link>
    </div>
  );
}
export default Notifications;