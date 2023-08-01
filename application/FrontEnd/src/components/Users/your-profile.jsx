import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Amplify, API} from 'aws-amplify';
import "../css/Profile2.css";
import { ListHolder } from "../ListCardsPage/list-cards";
import DummyData from "../DummyData/listings-dummy-data";
import { ListItems } from "../ListCardsPage/list-cards";
import FollowersWindow from "./follows-display";
import { FollowingWindow } from "./follows-display";

import UsersDummyData from "../DummyData/users-dummy";
import { UsersDummyData2 } from "../DummyData/users-dummy";

import EditProfileWindow from "./edit-profile";

function YourProfile() {
  const [showWindow1, setShowWindow1] = useState(false);
  const [showWindow2, setShowWindow2] = useState(false);
  const [showWindow3, setShowWindow3] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  const handleFollowClick1 = () => {
    //console.log(`API contents in follow: ${MyUser[0].name} and ${MyUser.name} and ${MyUser}`);
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
  
  const handleEditClick= () => {
    setShowWindow3(true);
  };

  const handleClose3 = () => {
    setShowWindow3(false);
  };

  
  const storedUsername = sessionStorage.getItem("username");

  const MyProfileDummyData = {
    1: {
        id: 1,
        name: 'SampleUser', //This is also stored locally in session storage
        description: 'Bay Area Foodie, follow me for mouth-watering food pics and inspiring travel snaps',
        pfp:'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
        //I don't recall seeing these values in a User API call
        //If they're not there, can you add these in?
        following: '69',
        followers: '50',
        listamount: '8',
        ispublic: '0'
      }
    }

    const [MyUser, setUser] = useState(null);

    const apiKey = '852piontsi'; // Replace 'YOUR_API_KEY' with your actual API key
    
    async function getMyProfileInfo() {
      console.log("Retrieving Profile Data");
      const myUserId= window.sessionStorage.getItem('userid');
      const apiUrl = `https://852piontsi.execute-api.us-east-1.amazonaws.com/dev/userProfile?userid=${myUserId}`;
    
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'x-api-key': apiKey,
          },
        });
        const data = await response.json();
        console.log("data recieved: " + data);
        const fetchedMyUser = data.body.map((MyUser) => ({
          id: MyUser.id,
          name: MyUser.name,
          description: MyUser.description,
          pfp: MyUser.pfp,
          is_public: MyUser.is_public,
          following: MyUser.following,
          followers: MyUser.followers,
          listamount: MyUser.listamount,
        }));
        setUser(fetchedMyUser);
        console.log(`API request received with: ${JSON.stringify(data)}`);
        console.log("API request received with MyUser:", fetchedMyUser);
        setIsLoading(false);
      } catch (error) {
        console.log(`API request has failed: ${error}`);
      }
    }
    
    useEffect(() => {
      getMyProfileInfo();
      console.log(`API contents: ${MyUser}`);
    }, []);

    return (
      <div className="main-container">
        <div className="profile-container">
          <div className="profile-side"></div>
    
          {isLoading ? ( // Check isLoading state to display loading icon or data
          <div className="loading-icon-holder">
          <div className="loading-icon">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        ) : (
            
            <div className="profile-middle">
              <div className="profile-header">
                <div className="ph-l">
                  <div className="ph-c1">
                   
                  <img
    className="ph-img"
    src={MyUser[0].pfp ? MyUser[0].pfp : "https://dummyimage.com/100/787878/000000.png&text=USER"}
    style={{ borderRadius: "200px" }}
    alt="pfp Icon"
  />
                  </div>
    
                  <div className="ph-c2">
                    <div className="ph-c2r1">
                      <h2 className="your-profile-username">{MyUser[0].name ? MyUser[0].name : "No Username"}</h2>
                      <button className="ph-button" onClick={handleEditClick}>
                        Edit Profile
                      </button>
                    </div>
    
                    <div className="ph-c2r2">
                      <div className="your-profile-description">
                      {MyUser[0].description ? MyUser[0].description : "No description"}
                      </div>
                    </div>
                  </div>
                </div>
    
                <div className="ph-r">
                  <div className="ph-follow">
                  
                    <h1>{MyUser[0].listamount ? MyUser[0].listamount : "0"}</h1>
                    <h4>Lists</h4>
                  </div>
                  <div
                    className="ph-follow"
                    onClick={() => handleFollowClick1("Followers")}
                  >
                    <h1>{MyUser[0].followers ? MyUser[0].followers : "0"}</h1>
                    <h4>Followers</h4>
                  </div>
                  <div
                    className="ph-follow"
                    onClick={() => handleFollowClick2("Following")}
                  >
                    <h1>{MyUser[0].following ? MyUser[0].following: "0"}</h1>
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
                {showWindow3 && (
                  <EditProfileWindow handleClose3={handleClose3} />
                )}
              </div>
    
              <div className="profile-middle-spacer"></div>
    
              <ProfileListHolder map={DummyData} />
            </div>
          )}
    
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
