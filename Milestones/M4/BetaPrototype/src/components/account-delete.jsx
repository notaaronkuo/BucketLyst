import React, { useState } from "react";

import {Link, useNavigate} from "react-router-dom";

//Make the account delete component
function AccountDelete() {

  const navigate = useNavigate();
  function handleExit() {
    navigate("/login1");
  }

  return (
    <div className = "account-delete">
      <img 
        className = "warninglogo" 
        src = "https://i.ibb.co/GvcFqf5/icon-warning-2.png" 
        style={{ width: '80px', height: '90px', objectFit: 'cover', position:'relative', top:'40px'}}
        alt= "WarningLogo">
      </img>
      <h1>Delete your account</h1>
      <div className = "warning">      
        <h2>Warning: This cannot be undone.</h2>
        <ul>
          <li>
            <img 
              className = "warningicon" 
              src ="https://i.ibb.co/thwLCN7/icon-pc-check.png"
              alt = "Checkmark">
              </img>
            <p>All data will be deleted</p>
          </li>
          <li>
            <img 
              className = "warningicon" 
              src ="https://i.ibb.co/thwLCN7/icon-pc-check.png"
              alt = "Checkmark">
            </img>
            <p>All lists made will be lost</p>
          </li>
          <li>
            <img 
              className = "warningicon" 
              src ="https://i.ibb.co/thwLCN7/icon-pc-check.png"
              alt = "Checkmark">
              </img>
            <p>All history will be deleted</p>
          </li>
        </ul>
      </div>
      <div className = "buttons">
        <button onClick = {handleExit} className = "deletebutton" type = "submit">🗸 Delete Account</button>
        <button onClick = {handleExit} className = "cancelbutton" type = "submit">Cancel</button>
      </div>
    </div>
  );
}

export default AccountDelete;