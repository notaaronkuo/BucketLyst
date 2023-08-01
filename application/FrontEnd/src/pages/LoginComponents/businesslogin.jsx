import React, { useEffect, useState } from "react";

import "../css/B-Login.css";
import { Link, useNavigate } from "react-router-dom";

function Businesslogin() {
  const navigate = useNavigate();

  const handleClick3 = () => {
    console.log("test if this is called");
    navigate("/home");
  };

  return (
    <div className="business-page">
      <div className="business-login">
        {/* PLEASE INCLUDE A LINK FOR THE TITLE */}
        <a href="/landing">
          <header class="business-header">
            <img
              src="https://i.ibb.co/c8HxSLM/Group-118.png"
              alt="Company Logo"
            ></img>
            <h1 className="company-name">
              BUCKETLYST
              <br /> BUSINESS
            </h1>
          </header>
        </a>
        <img
          className="landing-home-button-business"
          src="https://i.ibb.co/y8yJFqg/back.png"
          alt="Back Button"
          onClick={handleClick3}
        />
        <h1>WELCOME BACK!</h1>
        <form>
          <label className="username-title">Username</label>
          <input type="text" name="username" />
          <br />
          <label className="password-title">Password</label>
          <input type="password" name="password" />
          <br />

          <div className="business-forgot-password">
            <a href="#">Forgot your password?</a>
            <br />
          </div>

          <Link to="/terms" className="checkbox-policy">
            Accept terms and policy
          </Link>
          <input type="checkbox" name="terms" />

          <br />
          <button type="submit">Sign In</button>
        </form>
        <p className="just-words">Don't have a business account yet? </p>
        <Link to="/bmembership" class="b-link3">
          Sign up now
        </Link>
      </div>{" "}
      <img
        className="business-image"
        src="https://i.ibb.co/DpRcbFn/businessimage.png"
        alt="businessimage"
        border="0"
      ></img>
    </div>
  );

  return (
    <div className="b-body">
      <div class="business-login">
        <Link to="/login1">
          <button className="b-back-button">
            <img
              style={{ width: "auto", height: "50px" }}
              className="b-back-button"
              src="https://i.ibb.co/TLPrM29/back.png"
              alt="ack"
            />
          </button>
        </Link>

        <form class="b-login-form">
          <h2>Welcome Back!</h2>

          <label for="company" class="b-compname">
            Company Name
          </label>
          <input type="company" id="company" />

          <label for="email" class="b-email">
            Email
          </label>
          <input type="email" id="b-email" />

          <label for="username" class="b-password">
            Password
          </label>
          <input type="password" id="b-password" />

          <Link to="/reset1" class="b-link1">
            Forgot Password?
          </Link>

          <Link to="/home">
            <button type="submit" class="b-button1">
              Log In
            </button>
          </Link>

          <Link to="/bmembership" class="b-link3">
            Don't have a business account yet? Sign up now
          </Link>
        </form>
      </div>

      <div class="b-image-holder">
        <img
          src="https://i.ibb.co/DpRcbFn/businessimage.png"
          className="b-image"
          alt="businessimage"
          border="0"
        ></img>
      </div>
    </div>
  );
}

export default Businesslogin;
