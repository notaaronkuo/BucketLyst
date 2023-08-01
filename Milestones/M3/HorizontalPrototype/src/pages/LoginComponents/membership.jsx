import React, { useState } from "react";

import "../css/Login.css";
import { Link } from "react-router-dom";

function Membership() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
      // Handle form submission
    }
  };

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
        <div className="join-container">
          <h2 class="welcome">Join BucketLyst</h2>

          {/*<button class="btn btn-facebook">Continue with Facebook</button>*/}
          <a href="/implementlater" className="facebook-btn">
            Continue with Facebook
          </a>

          {/*<button class="btn btn-google">Continue with Google</button>*/}
          <a href="/implementlater" className="google-btn">
            Continue with Google
          </a>
          <h4 class="join-OR">OR</h4>

          <form className="member-form" onSubmit={handleSubmit}>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required></input>

            <label for="email">Email</label>
            <input type="text" id="email" name="email" required></input>

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={handlePasswordChange}
            />

            <label htmlFor="password-confirm">Confirm Password:</label>
            <input
              type="password"
              id="password-confirm"
              name="password-confirm"
              required
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />

            {!passwordsMatch && (
              <div className="error">Passwords do not match.</div>
            )}

            <label for="Tos">
              Accept terms of service
              <input type="checkbox"></input>
            </label>

            <Link to="/home">
              {" "}
              <input type="submit" value="Sign in"></input>
            </Link>
          </form>
        </div>
      </div>
    </body>
  );
}

export default Membership;