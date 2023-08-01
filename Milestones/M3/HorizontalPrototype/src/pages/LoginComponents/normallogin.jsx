
import React from "react";
/* global gapi */
//import './css/Hotbar.css';
//import './css/Login.css';

import { Link } from "react-router-dom";
import "../css/Login.css";

function onSuccess(googleUser) {
  console.log("Logged in as: " + googleUser.getBasicProfile().getName());
}
function onFailure(error) {
  console.log(error);
}

function login() {
  return (
    <body>
      <div class="container">
        <div class="intro">
          <h1>Welcome to our community</h1>
          <p>
            Easily organize your favorite places into custom lists. Create your
            own personalized map of memories with Bucketlyst.
          </p>

          <div class="profile">
            <p className="stars">
              <span class="gold-star">&#9733;</span>
              <span class="gold-star">&#9733;</span>
              <span class="gold-star">&#9733;</span>
              <span class="gold-star">&#9733;</span>
              <span class="gold-star">&#9733;</span>
              <p className="quote-1">
                “Love Bucketlyst! Easy to save and organize favorite spots, and
                search and filter functions make it a breeze to find new places.
                Sharing lists is great too. Highly recommend!”
              </p>
            </p>
            <img
              class="profile-pic-1"
              src="https://i.ibb.co/wCkw8mv/Screen-Shot-2023-05-04-at-11-34-37-AM.png"
              alt="Profile Picture"
            ></img>
            <div class="profile-info">
              <h2 class="name-profile-pic">Devon Lane</h2>
              <p class="description">Co-Founder, BucketLyst</p>
            </div>
          </div>
        </div>
        <div class="login-container">
          <h2 class="welcome">Welcome back!</h2>
          {/*<button class="btn btn-facebook">Continue with Facebook</button>*/}
          <a href="/implementlater" className="facebook-btn">
            Login with Facebook
          </a>
          {/*<button class="btn btn-google">Continue with Google</button>*/}
          <a href="/implementlater" className="google-btn">
            Login with Google
          </a>
          <h4 class="OR">OR</h4>
          <form className = "login-form">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required></input>

            <label for="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
            ></input>

            <Link to="/implementlater" class="forget-pass-link">
              Forget Password?
            </Link>
            <label for="Remember">
              Remember Me
              <input type="checkbox"></input>
            </label>

            <Link to="/home">
              {" "}
              <input type="submit" value="Sign in"></input>
            </Link>

            <Link to="member" class="new-user-link">
              Make a new account
            </Link>
          </form>
        </div>
      </div>
    </body>
  );
}

export default login;
