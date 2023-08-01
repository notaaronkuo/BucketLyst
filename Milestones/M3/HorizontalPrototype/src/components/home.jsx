import React, { useState } from 'react';

import './css/Home.css'
import './css/ListItems.css'
import { Link, useLocation, Switch } from 'react-router-dom';
import MakeListWindow from './make-list';
import {DummyData2, DummyData3, DummyData4} from './listings-dummy-data';
import DummyData from './listings-dummy-data';


function HomeHeader() {
  const location = useLocation();

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

          Lists

        </div>

        <div className='home-switcher'>
      <Link to='/home'>
        <button className={`home-switch-button ${location.pathname === '/home' ? 'underline' : ''}`}>
          My Lists
        </button>
      </Link>
      <Link to='/listfollow'>
        <button className={`home-switch-button ${location.pathname === '/listfollow' ? 'underline' : ''}`}>
          Following's List
        </button>
      </Link>
      <Link to='/listdiscover'>
        <button className={`home-switch-button ${location.pathname === '/listdiscover' ? 'underline' : ''}`}>
          Discover
        </button>
      </Link>
      <Link to='/listsaved'>
        <button className={`home-switch-button ${location.pathname === '/listsaved' ? 'underline' : ''}`}>
          Saved
        </button>
      </Link>
    </div>

        <div className = 'home-search'>
          <input type="text" placeholder="Search.."></input>
        </div>

        <div className = 'home-button'>
          <MakeListWindow/>
        </div>

       


        <div className = 'home-empty'>

        </div>

      </div>


  )

}

function ListItems({id, name, subtitle, tags, visibility, bookmarks, photo}) {


  return(
    <div className='list-item'>


<div class="card">
<Link to = '/implementlater'>
          <div class="card-image">
            <img
            src={photo}
              /*src="https://i.ibb.co/sR6cvst/Screen-Shot-2023-05-03-at-9-16-24-PM.png"*/
              alt="Image"
            ></img>
            <div class="bookmark-icon">
              <div class="bookmark-background">
                <div class="bookmark-logo">
                  <i class="fa fa-bookmark"></i>
                </div>
                <img src="https://i.ibb.co/SnnpXyQ/bookmark.png" alt="Home Icon" style={{ width: '50%', height: 'auto', objectFit: 'cover'}}></img>
                <div class="bookmark-count">{bookmarks}</div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div className="card-title">{name} </div>
            <p class="card-description">{subtitle}</p>
            <p class="card-more-description">
            {tags.join(' ')}
            </p>
            <div class="footer-text">{visibility}</div>
          </div>
          </Link>
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

function MyFeed() {

  const location = useLocation();

  return (
    <div className='main-container'>

      <div className='home-vertical-holder'>

        {/*<div className='home-side'></div>*/}

         <div className='home-middle'>

           <HomeHeader/>

           {location.pathname === '/home' ? <ListHolder map={DummyData}/> : ''}
           {location.pathname === '/listfollow' ? <ListHolder map={DummyData2}/> : ''}
           {location.pathname === '/listdiscover' ? <ListHolder map={DummyData3}/> : ''}
           {location.pathname === '/listsaved' ? <ListHolder map={DummyData4}/> : ''}

        </div>



      </div>
    </div>
  );
}


export default MyFeed;