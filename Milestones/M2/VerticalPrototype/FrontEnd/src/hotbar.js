import React from 'react';
import './Hotbar.css';
import './Login.css';

import { Link } from 'react-router-dom';


function Hotbar() {
  return (
    <div className="hotbar">
      <Link to="/" className="hotbar-home-link">Home (Search)</Link>
      <div class="dropdown">
    <button class="dropbtn">Start
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <Link to = "/makeList" className="hotbar-makelist-link">Make new List</Link>
      <Link to = "/soonPage" className="hotbar-soonPage-link">Add to existing List</Link>
      <Link to = "/soonPage" className="hotbar-soonPage-link">Import List</Link>
    </div>
    </div>
      <Link to="/about" className="hotbar-about-link">About</Link>

     
      
      <Link to="/login" className="hotbar-login-link">Login</Link>
    </div>
  );
}

export default Hotbar;

/**<div class="search">
            <form action="#">
                <input type="text"
                    placeholder=" Search Lists"
                    name="search"></input>
                <button>
                    <i class="fa fa-search">
                    </i>
                </button>
            </form>
        </div> */