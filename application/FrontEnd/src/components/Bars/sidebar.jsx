import React from "react";
import "../css/Sidebar.css";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-icons">
        <Link to="/home">
          <button
            className={`side-switch-button ${
              location.pathname === "/home" ? "active" : ""
            }`}
            style={{
              width: "40px",
              height: "auto",
              cursor: "pointer",
              overflow: "hidden",
              border: "none",
              backgroundColor:
                location.pathname === "/home" ? "rgba(0,0,0,0.1)" : "white",
            }}
          >
            <img
              className="sidebar-img"
              src="https://cdn-icons-png.flaticon.com/512/263/263115.png"
              alt="Home Icon"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </button>
        </Link>

        <Link to="/listdiscover">
          <button
            className={`side-switch-button ${
              location.pathname === "/listdiscover" ? "active" : ""
            }`}
            style={{
              width: "40px",
              height: "auto",
              cursor: "pointer",
              overflow: "hidden",
              border: "none",
              backgroundColor:
                location.pathname === "/listdiscover"
                  ? "rgba(0,0,0,0.1)"
                  : "white",
            }}
          >
            <img
              className="sidebar-img"
              src="https://cdn-icons-png.flaticon.com/512/10549/10549832.png"
              alt="List Icon"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </button>
        </Link>

        <Link to="/users">
          <button
            className={`side-switch-button ${
              location.pathname === "/users" ? "active" : ""
            }`}
            style={{
              width: "40px",
              height: "auto",
              cursor: "pointer",
              overflow: "hidden",
              border: "none",
              backgroundColor:
                location.pathname === "/users" ? "rgba(0,0,0,0.1)" : "white",
            }}
          >
            <img
              className="sidebar-img"
              src="https://cdn-icons-png.flaticon.com/512/1500/1500455.png"
              alt="Users Icon"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </button>
        </Link>
      </div>
    </div>
  );
}

function SidebarLanding() {
  return (
    <div className="sidebar">
      <div className="sidebar-icons">
        <img
          src="https://cdn-icons-png.flaticon.com/512/263/263115.png"
          alt="Home Icon"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: "0",
          }}
        />
      </div>
    </div>
  );
}

export { SidebarLanding };
export default Sidebar;
