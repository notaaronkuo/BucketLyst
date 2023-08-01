import { useState } from "react";
import './css/Topbar.css';

import { Link } from 'react-router-dom';

function Topbar() {
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
    <Link to="/implementlater">
      <button style={{ width: '40px', height: '40px', cursor: 'pointer', border: 'none', backgroundColor: 'white', padding: '0px 0px' }}>
        <img className = "topbar-img" src="https://cdn-icons-png.flaticon.com/512/2529/2529521.png" alt="Bell Icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </button>
    </Link>

      <Link to="/implementlater">
      <button style={{ width: '40px', height: '40px', cursor: 'pointer', border: 'none', backgroundColor: 'white', padding: '0px 0px'  }}>
        <img className = "topbar-img"src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt="Bell Icon" style={{ width: '100%', height: '100%', objectFit: 'cover'}} />
      </button>
    </Link>

      <div class="dropdown2">
      <button style={{ width: 'auto', height: '40px', cursor: 'pointer', overflow: 'hidden',fontSize: '1.5em', border: 'none', backgroundColor: 'white', textalign: 'center'}}>
        Username  
        <img src="https://cdn-icons-png.flaticon.com/512/2985/2985150.png" alt="down Icon" style={{ width: 'auto', height: '30px', objectFit: 'cover' }} />
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <Link to = "/implementlater" className="hotbar-soonPage-link">Your Profile</Link>
      <Link to = "/" className="hotbar-makelist-link">My Lists</Link>
      <Link to = "/implementlater" className="hotbar-soonPage-link">Settings</Link>
      <Link to = "/login1" className="hotbar-soonPage-link">Log Out</Link>


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