import React, { useState, useEffect } from 'react';

import '../css/Home.css'
import '../css/ListItems.css'
import { Link,} from 'react-router-dom';
import MakeListWindow from '../ListCardsPage/make-list';
import {DummyData2, DummyData3, DummyData4} from '../DummyData/listings-dummy-data';
import DummyData from '../users-dummy-data';
import {Amplify, API} from 'aws-amplify';
import axios from 'axios';


function HomeHeader() {

  const [showWindow, setShowWindow] = useState(false);

  const handleButtonClick = () => {
    setShowWindow(true);
  };

  const handleCloseWindow = () => {
    setShowWindow(false);
  };


  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    const apiName = 'wjyapent1i';
    const path = `/search/user/${query}`;
    const myInit = {
      headers: {} // OPTIONAL
    };

    try {
      const response = await API.get(apiName, path, myInit);
      // Handle the response data
      console.log(response);
    } catch (error) {
      // Handle the error
      console.log(error.response);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return(

    <div className = 'home-header'>

        <div className = 'home-title'>

          Find People to Follow

        </div>

       

        <div className='home-search'>
      <input
        type='text'
        placeholder='Search User..'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>


        <div className = 'home-empty'>

        </div>

      </div>


  )

}

function ListItems({id, name, desc, photo}) {

  const [isFollowing, setIsFollowing] = useState(false);

  function handleFollowClick() {
    setIsFollowing(true);
  }



  return(
    <div className='list-item'>


<div class="card">
  
          <div class="card-image">
          <Link to = "/userpage">
            <img
            src={photo}
              /*src="https://i.ibb.co/sR6cvst/Screen-Shot-2023-05-03-at-9-16-24-PM.png"*/
              alt="Image"
            ></img>
             </Link>
          </div>
          <div class="card-body">
          <Link to = "/userpage">
            <div className='user-card-top'>
              <div className="card-title-user">{name} </div>
            

            <button
              className={`follow2-button ${isFollowing ? "following" : ""}`}
              onClick={handleFollowClick}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>


          </div>
          </Link>
          <Link to = "/userpage">
            <p class="card-more-description">
            {desc}
            </p>
            </Link>

          </div>
         
        </div>
        
              

               {/*Tommy's part for designing a component */}
    </div>
  )
}

function ListHolder({map}) {

  const listings = [];

  for (const [id, values] of Object.entries(map)) {
    listings.push(<ListItems key={id} {...values} />);
  }


  return(
    <div className='list-holder'>

             {listings}
    </div>
  )
}

function User_lists() {
  const [users, setUsers] = useState(null);

  
  
useEffect(() => {

  const apiName = 'wjyapent1i';
const path = '/search/users/all';
const myInit = {
  headers: {}, // OPTIONAL
  response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
  queryStringParameters: {
  }
};


async function fetchData() {
  try {
    const response = await API.get(apiName, path, myInit);
    console.log("Success for fetching all users");
    const fetchedUsers = response.result.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      isPublic: user.is_public,
    }));
    console.log(fetchedUsers);
    setUsers(fetchedUsers);
  } catch (error) {
    console.log(error.response);
  }
}

fetchData();
}, []);


  return (
    <div className='main-container'>

      <div className='home-vertical-holder'>

        {/*<div className='home-side'></div>*/}

         <div className='home-middle'>

           <HomeHeader/>

           {users === null ? (
        <ListHolder map={DummyData} />
      ) : (
        <ListHolder map={users} />
      )}


        </div>



      </div>
    </div>
  );
}


export default User_lists;
