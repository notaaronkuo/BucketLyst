import React from 'react';
import './css/Sidebar.css';

import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="sidebar-icons">

        <Link to="/listdiscover">
      <button  style={{ width: '40px', height: 'auto', cursor: 'pointer', overflow: 'hidden', border: 'none', backgroundColor: 'white' }}>
        <img className = "sidebar-img" src="https://cdn-icons-png.flaticon.com/512/263/263115.png" alt="Home Icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </button>
        </Link>

        <Link to="/home">
      <button style={{ width: '40px', height: 'auto', cursor: 'pointer', overflow: 'hidden', border: 'none', backgroundColor: 'white',}}>
        <img className = "sidebar-img" src="https://cdn-icons-png.flaticon.com/512/10549/10549832.png" alt="List Icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </button>
        </Link>

        <Link to="/users">
      <button style={{ width: '40px', height: 'auto', cursor: 'pointer', overflow: 'hidden', border: 'none', backgroundColor: 'white'}}>
        <img className = "sidebar-img" src="https://cdn-icons-png.flaticon.com/512/1500/1500455.png" alt="Users Icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </button>
        </Link>
      </div>
    </div>
  );
}

function SidebarLanding(){

    return (
      <div className="sidebar">
  
        <div className="sidebar-icons">
  
          <img src="https://cdn-icons-png.flaticon.com/512/263/263115.png" alt="Home Icon" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0' }} />

        </div>
      </div>
    );

}


export {SidebarLanding};
export default Sidebar;
