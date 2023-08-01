import React from "react";

import "../css/Login.css";
import "../css/B-Login.css";
import { Link } from "react-router-dom";

function businessMembership() {
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
        <h1>
          JOIN <br /> BUCKETLYST
          <br /> BUSINESS
        </h1>
        <form>
          <div>
            <label className="business-membership-company-name">
              Company Name
            </label>
            <input
              type="text"
              id="business-membership-company-name"
              name="business-membership-company-name"
              placeholder="Enter your company name"
            ></input>

            <label className="business-membership-email">Email</label>
            <input
              type="email2"
              id="business-membership-email"
              name="business-membership-email"
              placeholder="Enter your email"
            ></input>

            <label className="business-membership-username">Username</label>
            <input
              type="text"
              id="business-membership-username"
              name="business-membership-username"
              placeholder="Enter your username"
            ></input>

            <label className="business-membership-password">Password</label>
            <input
              type="password"
              id="business-membership-password"
              name="business-membership-password"
              placeholder="Enter your password"
            ></input>

            <label for="business-membership-confirm-password">
              Confirm Password
            </label>
            <input
              type="password"
              id="business-membership-confirm-password"
              name="business-membership-confirm-password"
              placeholder="Confirm your password"
            ></input>
          </div>
          <button type="submit">Submit</button>
        </form>

        <p className="just-words">Already have an account? </p>
        <Link to="/bmembership" class="b-link3">
          Sign in here
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
    <div class="b-body">
      <div class="b-business-membership">
        <Link to="/blogin">
          <button className="b-back-button">
            <img
              style={{ width: "auto", height: "50px" }}
              className="b-back-button"
              src="https://i.ibb.co/TLPrM29/back.png"
              alt="ack"
            />
          </button>
        </Link>

        <form className="b-register-form">
          <h2>Business Sign Up</h2>

          <label for="company" class="b-compname">
            Company Name
          </label>
          <input type="company" id="b-company" />

          <label for="email" class="b-email">
            Email
          </label>
          <input type="email" id="b-email" />

          <label for="password" class="b-password">
            Password
          </label>
          <input type="password" id="b-password" />

          <label for="rpassword" class="b-rpassword">
            Re-Enter Password
          </label>
          <input type="password" id="b-password" />

          <Link to="/home">
            <button type="submit" class="b-button1">
              Create Business Account
            </button>
          </Link>
          <Link to="/blogin" class="b-link1">
            Back to Business Sign In
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

export default businessMembership;
