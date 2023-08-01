import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ImplementLater() {
  const linkStyle = {
    textDecoration: "none",
    color: "#ffffff",
    backgroundColor: "#F43F5E",
    padding: "10px 20px",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "bold",
  };

  return (


    <div class = "main-container">
      <div className = "implement-header">
          <h1>We will Implement this later. Please press Back.</h1>

          <Link
      to={{ pathname: "/", state: { from: window.location.pathname } }}
      style={linkStyle}
    >
      Back
    </Link>
        </div>
         
     </div>

  );
}

export default ImplementLater;