import React, { useState } from "react";

function Settings() {
  return (
    <div className="settings-page">
      <h2 className="settings-title">Settings</h2>
      <div className="setting">
        <span className="setting-label">
          Visibility&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <label className="toggle-switch">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
      </div>
      <div className="setting">
        <span className="setting-label">Notification&nbsp;</span>
        <label className="toggle-switch">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
      </div>
      <button className="delete-account-button">Delete Account</button>
    </div>
  );
}

export default Settings;
