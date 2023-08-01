import React, { useState } from "react";
import { Link } from "react-router-dom";

/*import "./css/cssReset.css";*/

import "./css/LandingPage.css";
import Footer from "./footer";
//import "bootstrap/dist/css/bootstrap.min.css";

function LandingPage() {
  const [hook, setHook] = useState("");

  return (
    <div>
    <div class="row">
      {/* row 1 */}
      <div class="col-md-6">
        <h1 className="landing-hook">
          Your ultimate tool for saving and sharing your favorite locations
        </h1>
        <p className="hook-description">
          Stay organized, never forget your favorite spots by creating your own
          personalized map of memories with BucketLyst.
        </p>
        <Link to="/member">
        <button 
          className="start-button"
          onClick={() => console.log("Start for free clicked!")}
        >
          Start for free
        </button>
        </Link>
      </div>
      <div class="col-md-6">
        <img
          className="hook-image"
          src="https://i.ibb.co/hR3qwwf/Screen-Shot-2023-05-02-at-6-08-06-PM.png"
          alt="Placeholder image"
        />
      </div>

      {/* row 2 */}
      <div class="col-md-6">
        <h2 className="small-text-above-2">
          Everything in one convenient place
        </h2>
        <h1 className="second-large-text">
          Keep track of places you’ve been or ones you want to go
        </h1>
        <p className="small-text-below-2">
          You can easily pin your favorite spots on your personal map and create
          custom lists, so you'll never forget the restaurant you discovered or
          the new park you visited. Whether you're tracking the places you've
          been, the ones you want to go, or the ones your loved ones
          recommended, Bucketlys has got you covered!
        </p>
      </div>
      <div class="col-md-6">
        <img
          className="hook-image-2"
          src="https://i.ibb.co/M6kBYZQ/Screen-Shot-2023-05-02-at-6-27-40-PM.png"
          alt="Placeholder image"
        />
      </div>

      {/* row 3 */}
      <div class="col-md-6">
        <img
          className="hook-image-3"
          src="https://i.ibb.co/q0Db3vx/Screen-Shot-2023-05-03-at-1-03-59-PM.png"
          alt="Placeholder image"
        />
      </div>
      <div class="col-md-6">
        <h2 className="small-text-above-3">No more scrumbling around</h2>
        <h1 className="third-large-text">
          Add to your list, search and filter. Stay organized
        </h1>
        <p className="small-text-below-3">
          Stuck on where to go? No worries! Bucketlys has you covered with its
          built-in filter and search function. Quickly sort through your
          favorite places to find the perfect spot for your mood, whether you're
          looking for a cozy coffee shop or a lively bar. With categories like
          "food," "entertainment," and "outdoor activities," and filters like
          "open now" and "places near you," Bucketlys makes it easy to discover
          new places and revisit your old favorites. With Bucketlys, your
          perfect spot is just a few clicks away!
        </p>
      </div>

      {/* row 4 */}

      <div class="col-md-6">
        <h2 className="small-text-above-4">Only one click away to</h2>
        <h1 className="fourth-large-text">
          Share your favorite lists with friends and family
        </h1>
        <p className="small-text-below-4">
          Next time your friends ask you for a sushi restaurant recommendation,
          simply pull up your custom list and find the perfect spot with ease.
          Bucketlys makes it easy to share your favorite places with your
          friends and family, so you'll never have to scramble to remember where
          you went or what you liked about a particular spot. With Bucketlys,
          all your favorite spots are just a click away!
        </p>
      </div>
      <div class="col-md-6">
        <img
          className="hook-image-4"
          src="https://i.ibb.co/Wfy9ZVS/share.png"
          alt="Placeholder image"
        />
      </div>
      
    </div>
    <Footer/>
    </div>
  );
}

export default LandingPage;

/**You can make more components below if it helps with organization */
/*
<div class="landing-page-container">
      <h1>Landing Page</h1>
      <Link to="/login1" className="landing-page-link">
        Link to Log In Page
      </Link>
    </div>
*/
