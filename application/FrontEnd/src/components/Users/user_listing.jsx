import React, { useState, useEffect } from "react";

import "../css/Home.css";
import "../css/ListItems.css";
import "../css/LoadingAnimation.css";
import { Link } from "react-router-dom";
import MakeListWindow from "../ListCardsPage/make-list";
import {
  DummyData2,
  DummyData3,
  DummyData4,
} from "../DummyData/listings-dummy-data";
import DummyData from "../users-dummy-data";
import { Amplify, API } from "aws-amplify";
import axios from "axios";
function HomeHeader({ map, setUsers }) {
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isValidSearch, setIsValidSearch] = useState(true);
  const trimmedSearchInput = searchInput.trim();

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setIsValidSearch(true); // Reset the validation state when input changes
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (trimmedSearchInput.trim() === "") {
      setIsValidSearch(false);
      return;
    }
    console.log("loading mylists users");
  };
  function handleSearch() {
    const filteredUsers = map.filter((user) => user.name.includes(query));
    setUsers(filteredUsers);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="home-header">
      <div className="home-title">Find People to Follow</div>
      <div className="home-search">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search.."
            value={searchInput}
            onChange={handleSearchInputChange}
            className={!isValidSearch ? "invalid" : ""}
          />
          {!isValidSearch && (
            <div className="error-alert">
              Please enter a valid search query.
            </div>
          )}
        </form>
      </div>
      <div className="home-empty"></div>
    </div>
  );
}

function ListItems({ name, description, photo, id }) {
  const [isFollowing, setIsFollowing] = useState(false);

  function handleFollowClick() {
    setIsFollowing(true);
  }

  return (
    <div className="list-item">
      <div class="card">
        <div class="card-image">
          <img
            src={photo}
            /*src="https://i.ibb.co/sR6cvst/Screen-Shot-2023-05-03-at-9-16-24-PM.png"*/
            alt="Image"
          ></img>
        </div>
        <div class="card-body">
          <div className="user-card-top">
            <div className="card-title-user">
              {name}
              {id}{" "}
            </div>

            <button
              className={`follow2-button ${isFollowing ? "following" : ""}`}
              onClick={handleFollowClick}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
          \<p class="card-more-description">{description}</p>
        </div>
      </div>

      {/*Tommy's part for designing a component */}
    </div>
  );
}

{
  /*function ListHolder({users, setUsers}) {*/
}
function ListHolder({users, setUsers}) {
  /*
  const listings = [];

  for (const [id, values] of Object.entries(map)) {
    listings.push(<ListItems key={id} {...values} />);
  }
*/
  //const userss = DummyData;
  //const users = DummyData;

  return (
    <div className="list-holder">
   
        {Object.values(users).map((user) => (
          <li key={user.id}>
            <Link to={`/userpage/${user.user_fk}`}>
              <ListItems {...user}  setUsers ={ setUsers} />
            </Link>
          </li>
        ))}
    
    </div>
  );
}

function User_lists() {
  const [users, setUsers] = useState(null);

  async function searchUsers() {
    console.log("In search users");
    const apiName = "search";
    const path = "/search/users/all";
    const myInit = {
      headers: {},
      response: true,
      queryStringParameters: {},
    };

    try {
      const response = await API.get(apiName, path, myInit);
      const fetchedUsers = response.data.result.map((user) => ({
        id: user.id,
        name: user.name,
        description: user.description,
        user_fk: user.user_fk,
        photo: user.photo,
      }));
      setUsers(fetchedUsers);
      console.log(`API request received with:  ${response}`);
      console.log(JSON.stringify(fetchedUsers))
    } catch (error) {
      console.log(`API request ${apiName} has failed: ${error.response}`);
    }
  }

  useEffect(() => {
    searchUsers();

    console.log("use effect ran");
  }, []);
  return (
    <div className="main-container">
      <div className="home-vertical-holder">
        {/* <div className='home-side'></div> */}
        <div className="home-middle">
          
           {users === null ? (
            <div className='loading-icon-holder'>
              <div className='loading-icon'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
</div></div>
         
          ) : (<>
            <HomeHeader map={users} setUsers={setUsers} />
            <ListHolder users={users} setUsers={setUsers} />
            </>
          )}
         {/* <ListHolder />*/}
        </div>
      </div>
    </div>
  );
}

export default User_lists;
/*

import imageCompression from 'browser-image-compression';
import AWS from 'aws-sdk';
import { useState } from 'react';

AWS.config.update({
  accessKeyId: 'AKIAUXUORQAB7LG7C5QU',
  secretAccessKey: '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',
  region: 'us-east-1',
  signatureVersion: 'v4',
});

function ImageTest({setImageUrl, imageUrl}) {
  const s3 = new AWS.S3();
  
  const [file, setFile] = useState(null);

  const handleFileSelect = (e) => {
      setFile(e.target.files[0]);
  }
  const uploadToS3 = async () => {
      if (!file) {
          return;
      }
      const imageFile = file;

      const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920
      }
      try {
          const compressedFile = await imageCompression(imageFile, options);
          console.log(compressedFile.size/1024/1024);
          setFile(compressedFile)
      } catch (error) {
          console.log(error);
      }

      const params = {
          Bucket: 'csc648-848-bucketlyst',
          Key: `${Date.now()}.${file.name}`,
          Body: file
      };
      const { Location } = await s3.upload(params).promise();
      setImageUrl(Location);
      console.log('uploading to s3', Location);
  }
  return (
      <div style={{ marginTop: '150px' }}>
          <h1>Test Image Upload</h1>
          <input type="file" onChange={handleFileSelect} />
          {file && (
              <div style={{ marginTop: '10px' }}>
                  <button onClick={uploadToS3}>Upload</button>
              </div>
          )}
          {imageUrl && (
              <div style={{ marginTop: '10px' }}>
                  <img src={imageUrl} alt="uploaded" />
              </div>
          )}
      </div>
  );
}

function EditProfileWindow()  {

    const [imageUrl, setImageUrl] = useState(null);

  const handleUploadPfp = (event) => {
    event.preventDefault();
    console.log("Upload Profile Pic function");
    <ImageTest setImageUrl={setImageUrl} imageUrl={imageUrl}/>
     // MAKE API CALL HERE FOR THE UPDATED PROFILE PIC
  }

  const handleEditProfileClick = (event) => {
    event.preventDefault();

      return API.post('makelist', '/makelist', {
        body : {
          imageUrl: imageUrl
        }
     })
    
  };

  
    return (
        <>
        
                  <form>
                  
                    <button
                            className='add-profile-pic-button'
                            style={{
                              width: "40px",
                              height: "auto",
                              cursor: "pointer",
                              overflow: "hidden",
                              border: "none",
                            }}
                          >
                        <img
                           className="edit-profile=button-img"
                           src="https://i.ibb.co/SnbgGqD/plus.png"
                           alt="Home Icon"
                           onClick={handleUploadPfp}
                           style={{ width: "100%", height: "100%", objectFit: "cover" }}
                     />
                    </button>
                    
                
                </form>
                
          
        </>
      );
  }*/
