import { useState, useRef } from "react";
import '../css/Topbar.css';
import { Amplify, Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import {Notif} from './notifs';
import { Link } from 'react-router-dom';
import UsersDummyData from '../DummyData/users-dummy';
import  NotifWindow from '../Bars/notifs'

import notifications from '../DummyData/notif-dummy-data';
import {requests} from '../DummyData/notif-dummy-data';


const Topbar = ({ setIsLoggedIn }) => {
  function clearLocalStorage() {
    localStorage.clear();
    console.log("cleared!");
  }
  
  const [showNotifs, setNotifs] = useState(false);

const handleNotifClick = () => {
  setNotifs(true);
};

const handleClose = () => {
  setNotifs(false);
};

const handleLogOut = () => {
  console.log('set not logged in');
  setIsLoggedIn(false);
}

const storedUsername = localStorage.getItem('username');



  return (
    <div className="topbar">

    <div className = 'left-side'>
    <Link to="/home">
      <button style={{ width: 'auto', height: '40px', cursor: 'pointer', overflow: 'hidden', border: 'none', backgroundColor: 'white' }}>
        <img src="https://i.ibb.co/s2mg2jk/bucketlyst-logo-overhaul.png" alt="Home Icon" style={{paddingLeft:'10px', width: '100%', height: '100%', objectFit: 'cover' }} />
      </button>
    </Link>

        </div>

<div class = 'right-side'>

      <button 
      onClick={handleNotifClick}
      style={{ width: '40px', height: '40px', cursor: 'pointer', border: 'none', backgroundColor: 'white', padding: '0px 0px' }}>
        <img className = "topbar-img" src="https://cdn-icons-png.flaticon.com/512/2529/2529521.png" alt="Bell Icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </button>
      {/*showNotifs && 
          <NotifWindow data1={notifications}  data2={requests} handleClose={handleClose} />*/}
      

      <Link to="/yourprofile">
      <button style={{ width: '40px', height: '40px', cursor: 'pointer', border: 'none', backgroundColor: 'white', padding: '0px 0px'  }}>
        <img className = "topbar-img"src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt="Pfp Icon" style={{ width: '100%', height: '100%', borderRadius: '50px', objectFit: 'cover'}} />
      </button>
    </Link>

      <div class="dropdown2">
      <button style={{ width: 'auto', height: '40px', cursor: 'pointer', overflow: 'hidden',fontSize: '1.5em', border: 'none', backgroundColor: 'white', textalign: 'center', display: 'flex', justifyContent: 'center'}}>
      {storedUsername}
      
        <img src="https://cdn-icons-png.flaticon.com/512/2985/2985150.png" alt="down Icon" style={{ width: 'auto', height: '30px', objectFit: 'cover', alignSelf: 'center', justifySelf: 'center'}} />
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <Link to = "/yourprofile" className="hotbar-soonPage-link">Your Profile</Link>
      <Link to = "/home" className="hotbar-makelist-link">My Lists</Link>
      <Link to = "/settings" className="hotbar-soonPage-link">Settings</Link>
{/*
      <Link to = "/login1" className="hotbar-soonPage-link">Log Out</Link>
*/}
      <Authenticator>
            {({ signOut}) => 
            <div>
              <Link to = "/landing">
                <button 
                  onClick={() => {signOut(); clearLocalStorage(); handleLogOut();}}
                  style={{
                  border: 'none',
                  background: 'none',
                  padding: '25px 25px',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  color: 'inherit',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}>
                  Sign out</button></Link>
              </div>}

      </Authenticator>


      <Link to = "/tasks" className="hotbar-soonPage-link">Tasks Page (Temporary)</Link>



    </div>
    </div>
    </div>

    </div>
  );
}

function TopbarLanding() {
  return (
    <div className="topbar">

    <div className = 'left-side'>
    <Link to="/home">
      <button style={{ width: 'auto', height: '40px', cursor: 'pointer', overflow: 'hidden', border: 'none', backgroundColor: 'white' }}>
        <img src="https://i.ibb.co/s2mg2jk/bucketlyst-logo-overhaul.png" alt="Home Icon" style={{paddingLeft:'10px', width: '100%', height: '100%', objectFit: 'cover' }} />
      </button>
    </Link>

        </div>

<div class = 'right-side-landing'>

    <Link to="/implementlater">
      <button style={{ width: '150px', height: '100%', cursor: 'pointer', border: 'none', fontSize: '1.5rem', padding: '0px 0px', color: 'gray', backgroundColor: 'transparent'}}>
      Our Team
      </button>
    </Link>

    <Link to="/implementlater">
      <button style={{ width: '200px', height: '100%', cursor: 'pointer', border: 'none', fontSize: '1.5rem', padding: '0px 0px', color: 'gray', backgroundColor: 'transparent'}}>
      About BucketLyst
      </button>
    </Link>

    <Link to="/implementlater">
      <button style={{ width: '300px', height: '100%', cursor: 'pointer', border: 'none', fontSize: '1.5rem', padding: '0px 0px', color: 'gray', backgroundColor: 'transparent'}}>
      For Business Users
      </button>
    </Link>


    <Link to="/login1">
      <button style={{ width: '200px', height: '100%', cursor: 'pointer', border: 'none', fontSize: '1.5rem', padding: '0px 0px', color: 'gray', backgroundColor: 'transparent'}}>
      |&nbsp;&nbsp;&nbsp;Sign In
      </button>
    </Link>

    <Link to="/member">
      <button style={{  width: '175px', height: '100%', cursor: 'pointer', overflow: 'hidden', fontSize: '1.20rem', padding: '12px', borderRadius: '5px', border: 'none', backgroundColor: 'black', color: 'white' }}>
       Start for free
      </button>
    </Link>




    </div>
    </div>

  );
}



export {TopbarLanding};
export default Topbar;