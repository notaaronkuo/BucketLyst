import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Profile2.css";
import { ListHolder } from "../ListCardsPage/list-cards";
import DummyData from "../DummyData/listings-dummy-data";
import { ListItems } from "../ListCardsPage/list-cards";
import FollowersWindow from "./follows-display";
import { FollowingWindow } from "./follows-display";

import UsersDummyData from "../DummyData/users-dummy";
import { UsersDummyData2 } from "../DummyData/users-dummy";

function YourProfile() {
  const [showWindow1, setShowWindow1] = useState(false);
  const [showWindow2, setShowWindow2] = useState(false);

  const handleFollowClick1 = () => {
    setShowWindow1(true);
  };

  const handleClose1 = () => {
    setShowWindow1(false);
  };

  const handleFollowClick2 = () => {
    setShowWindow2(true);
  };

  const handleClose2 = () => {
    setShowWindow2(false);
  };

  return (
    <div className="main-container">
      <div className="profile-container">
        <div className="profile-side"></div>

        <div className="profile-middle">
          <div className="profile-header">
            <div className="ph-l">
              <div className="ph-c1">
                <img
                  className="ph-img"
                  src="https://i.ibb.co/s11x0R8/Image.png"
                  alt="pfp Icon"
                ></img>
              </div>

              <div className="ph-c2">
                <div className="ph-c2r1">
                  <h2 className="your-profile-username">Username</h2>
                  <button className="ph-button">Edit Profile</button>
                </div>

                <div className="ph-c2r2">
                  <div className="your-profile-description">
                    Bay Area Foodie, follow me for mouth-watering food pics and
                    wanderlust-inspiring travel snaps.
                  </div>
                </div>
              </div>
            </div>
            `
            <div className="ph-r">
              <div className="ph-follow">
                <h1>8</h1>
                <h4>Lists</h4>
              </div>
              <div
                className="ph-follow"
                onClick={() => handleFollowClick1("Followers")}
              >
                <h1>120</h1>
                <h4>Followers</h4>
              </div>
              <div
                className="ph-follow"
                onClick={() => handleFollowClick2("Following")}
              >
                <h1>128</h1>
                <h4>Following</h4>
              </div>
            </div>
            {showWindow1 && (
              <FollowersWindow
                data={UsersDummyData}
                handleClose1={handleClose1}
              />
            )}
            {showWindow2 && (
              <FollowingWindow
                data={UsersDummyData2}
                handleClose2={handleClose2}
              />
            )}
          </div>

          <div className="profile-middle-spacer"></div>

          <ProfileListHolder map={DummyData} />
        </div>

        <div className="profile-side"></div>
      </div>
    </div>
  );
}

function ProfileListHolder({ map }) {
  const listings = [];

  for (const [id, values] of Object.entries(map)) {
    listings.push(<ListItems key={id} {...values} />);
  }

  return <div className="profile-listholder">{listings}</div>;
}

export default YourProfile;
