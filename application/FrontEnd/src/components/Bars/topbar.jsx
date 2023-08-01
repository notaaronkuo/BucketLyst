import { useState, useEffect, useRef } from "react";
import "../css/Topbar.css";
import { Amplify, Auth } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { Notif } from "./notifs";
import { Link } from "react-router-dom";
import UsersDummyData from "../DummyData/users-dummy";
import NotifWindow from "../Bars/notifs";

import notifications from "../DummyData/notif-dummy-data";
import { requests } from "../DummyData/notif-dummy-data";

const Topbar = ({ setIsLoggedIn }) => {
  function clearSessionStorage() {
    sessionStorage.clear();
    console.log("cleared!");
  }

  const [showNotifs, setNotifs] = useState(false);

  const handleNotifClick = () => {
    setNotifs(true);
  };

  const handleClose = () => {
    setNotifs(false);
  };

  const handleLogOut = () => {
    console.log("set not logged in");
    setIsLoggedIn(false);
  };

  const storedUsername = sessionStorage.getItem("username");
  const storedPfp = window.sessionStorage.getItem('photo'); 

  const [logoSrc, setLogoSrc] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const newLogoSrc =
        window.innerWidth <= 600
          ? "https://i.ibb.co/HdNqg29/Group-117.png"
          : "https://i.ibb.co/s2mg2jk/bucketlyst-logo-overhaul.png";
      setLogoSrc(newLogoSrc);
    };

    handleResize(); // Call on component mount

    window.addEventListener("resize", handleResize);
    console.log("storedpfp:" + storedPfp);
    console.log("Printing Session Storage contents below.");
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      const value = sessionStorage.getItem(key);
      console.log(`${key}: ${value}`);
    }

    
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    
  }, []);
  return (
    <div className="topbar">
      <div className="left-side">
        <Link className="topbar-home-link" to="/home">
          <button
            className="topbar-bucketlyst-logo"
            style={{
              width: "auto",
              height: "40px",
              cursor: "pointer",
              overflow: "hidden",
              border: "none",
              backgroundColor: "white",
            }}
          >
            <img
              className="topbar-logo"
              src={logoSrc}
              alt="Home Icon"
              style={{
                paddingLeft: "10px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </button>
        </Link>
      </div>

      <div class="right-side">
        <button
          onClick={handleNotifClick}
          style={{
            width: "40px",
            height: "40px",
            cursor: "pointer",
            border: "none",
            backgroundColor: "white",
            padding: "0px 0px",
          }}
        >
          <img
            className="topbar-img"
            src="https://cdn-icons-png.flaticon.com/512/2529/2529521.png"
            alt="Bell Icon"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </button>
        {showNotifs && 
          <NotifWindow data1={notifications}  data2={requests} handleClose={handleClose} />}

        <Link to="/yourprofile">
          <button
            style={{
              width: "40px",
              height: "40px",
              cursor: "pointer",
              border: "none",
              backgroundColor: "white",
              padding: "0px 0px",
            }}
          >
            <img
              className="topbar-img"
              src={storedPfp}
              alt="Pfp Icon"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50px",
                objectFit: "cover",
              }}
            />
          </button>
        </Link>

        <div className="dropdown2">
          <button
            className="dropdown-button"
            style={{
              width: "auto",
              height: "40px",
              cursor: "pointer",
              overflow: "hidden",
              fontSize: "1.5em",
              border: "none",
              backgroundColor: "white",
              textalign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {storedUsername}

            <img
              className="dropdown-img"
              src="https://cdn-icons-png.flaticon.com/512/2985/2985150.png"
              alt="down Icon"
              style={{
                width: "auto",
                height: "30px",
                objectFit: "cover",
                alignSelf: "center",
                justifySelf: "center",
              }}
            />
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <Link to="/yourprofile" className="hotbar-soonPage-link">
              Your Profile
            </Link>
            <Link to="/home" className="hotbar-makelist-link">
              My Lists
            </Link>
            <Link to="/settings" className="hotbar-soonPage-link">
              Settings
            </Link>
            {/*
      <Link to = "/login1" className="hotbar-soonPage-link">Log Out</Link>
*/}
            <Authenticator>
              {({ signOut }) => (
                <>
                  <Link to="/landing">
                    <button
                      onClick={() => {
                        signOut();
                        clearSessionStorage();
                        handleLogOut();
                      }}
                      style={{
                        border: "none",
                        background: "#f43f5e",
                        backgroundColor: "#f43f5e",
                        padding: "15px 15px",
                        fontFamily: "inherit",
                        fontSize: "1.5rem",
                        color: "white",
                        cursor: "pointer",
                        width: "100%",
                        borderRadius: "10px",
                        textDecoration: "none",
                      }}
                    >
                      Sign out
                    </button>
                  </Link>
                </>
              )}
            </Authenticator>

        {/*}    <Link to="/tasks" className="hotbar-soonPage-link">
              Tasks Page (Temporary)
            </Link>
            <Link to="/implementlater" className="hotbar-soonPage-link">
              Rabin Workspace
            </Link>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

function TopbarLanding() {
  const [logoSrc, setLogoSrc] = useState("");
  const [showNotifs, setNotifs] = useState(false);

  const handleNotifClick = () => {
    setNotifs(true);
  };

  useEffect(() => {
    const handleResize = () => {
      const newLogoSrc =
        window.innerWidth <= 600
          ? "https://i.ibb.co/HdNqg29/Group-117.png"
          : "https://i.ibb.co/s2mg2jk/bucketlyst-logo-overhaul.png";
      setLogoSrc(newLogoSrc);
    };

    handleResize(); // Call on component mount

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="topbar">
      <div className="left-side">
        <Link className="topbar-home-link" to="/home">
          <button
            className="topbar-bucketlyst-logo"
            style={{
              width: "auto",
              height: "40px",
              cursor: "pointer",
              overflow: "hidden",
              border: "none",
              backgroundColor: "white",
            }}
          >
            <img
              className="topbar-logo"
              src={logoSrc}
              alt="Home Icon"
              style={{
                paddingLeft: "10px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </button>
        </Link>
      </div>

      <div class="right-side-landing">
        <Link to="/implementlater">
          <button
      
            style={{
              width: "150px",
              height: "100%",
              cursor: "pointer",
              border: "none",
              fontSize: "1.25rem",
              padding: "0px 0px",
              color: "gray",
              backgroundColor: "transparent",
            }}
          >
            Our Team
          </button>
        </Link>

        <Link to="/implementlater">
          <button
            style={{
              width: "200px",
              height: "100%",
              cursor: "pointer",
              border: "none",
              fontSize: "1.25rem",
              padding: "0px 0px",
              color: "gray",
              backgroundColor: "transparent",
            }}
          >
            About BucketLyst
          </button>
        </Link>

        <Link to="/implementlater">
          <button
            style={{
              width: "250px",
              height: "100%",
              cursor: "pointer",
              border: "none",
              fontSize: "1.25rem",
              padding: "0px 0px",
              color: "gray",
              backgroundColor: "transparent",
            }}
          >
            For Business Users
          </button>
        </Link>

        <Link to="/login1">
          <button
            style={{
              width: "120px",
              height: "100%",
              cursor: "pointer",
              border: "none",
              fontSize: "1.25rem",
              padding: "0px 0px",
              color: "gray",
              backgroundColor: "transparent",
            }}
          >
            |&nbsp;&nbsp;&nbsp;Sign In
          </button>
        </Link>

        <Link to="/member">
          <button
            style={{
              width: "175px",
              height: "100%",
              cursor: "pointer",
              overflow: "hidden",
              fontSize: "1.20rem",
              padding: "12px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "black",
              color: "white",
            }}
          >
            Start for free
          </button>
        </Link>
      </div>
    </div>
  );
}

export { TopbarLanding };
export default Topbar;
