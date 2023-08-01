import React, { useState } from 'react';

import '../css/Home.css'
import '../css/ListItems.css'
import { Link,} from 'react-router-dom';
import MakeListWindow from '../make-list';
import {DummyData2, DummyData3, DummyData4} from '../listings-dummy-data';
import DummyData from '../users-dummy-data';

function HomeHeader() {

  const [showWindow, setShowWindow] = useState(false);

  const handleButtonClick = () => {
    setShowWindow(true);
  };

  const handleCloseWindow = () => {
    setShowWindow(false);
  };

  return(

    <div className = 'home-header'>

        <div className = 'home-title'>

          Find People to Follow

        </div>

       

        <div className = 'home-search'>
          <input type="text" placeholder="Search User.."></input>
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
          <Link to = "/implementlater">
            <img
            src={photo}
              /*src="https://i.ibb.co/sR6cvst/Screen-Shot-2023-05-03-at-9-16-24-PM.png"*/
              alt="Image"
            ></img>
             </Link>
          </div>
          <div class="card-body">
          <Link to = "/implementlater">
            <div className="card-title-user">{name} </div>
            </Link>
            <div className="follow-button">
            <button
              className={`follow2-button ${isFollowing ? "following" : ""}`}
              onClick={handleFollowClick}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
          <Link to = "/implementlater">
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

function user_lists() {


  return (
    <div className='main-container'>

      <div className='home-vertical-holder'>

        {/*<div className='home-side'></div>*/}

         <div className='home-middle'>

           <HomeHeader/>

          <ListHolder map={DummyData}/>


        </div>



      </div>
    </div>
  );
}


export default user_lists;
