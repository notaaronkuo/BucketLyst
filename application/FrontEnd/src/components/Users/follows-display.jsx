import React, { useState } from 'react';

import { useNavigate} from "react-router-dom";
import '../css/MakeList.css';
import '../css/import.css';
import '../css/Profile2.css';


function FollowersWindow({ handleClose1, data })  {
    const [isOpen, setIsOpen] = useState(true);
   
    const handleOpen = () => {
      setIsOpen(true);
    };
  
    return (
        <>
          {/*<button className="h-button" onClick={handleOpen}>
            Create a new list
          </button>*/}
          {isOpen && (
            <div className="floating-window-overlay" >
              <div className="floating-window-add">
                <div className="floating-window-header-add">
                  <button button style={{ width: '10%', height: 'auto', cursor: 'pointer', overflow: 'hidden', border: 'none', backgroundColor: 'white', opacity: '0.5', alignSelf: 'top'}}onClick={handleClose1}>
                  <img src="https://cdn-icons-png.flaticon.com/512/130/130882.png" alt="Back Icon" style={{ width: '50%', height: 'auto', objectFit: 'cover'}}></img>
                  
                  </button>
                  <h3>Followers</h3>

                 
                </div>
                <div className='follow-contain'>
                {Object.values(data).map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
        </div>
              </div>
              <div className="floating-window-backdrop" onClick={handleClose1}></div>
            </div>
          )}
        </>
      );
  }

  function FollowingWindow({ handleClose2, data })  {
    const [isOpen, setIsOpen] = useState(true);
   
    const handleOpen = () => {
      setIsOpen(true);
    };
  

  
    return (
        <>
          {/*<button className="h-button" onClick={handleOpen}>
            Create a new list
          </button>*/}
          {isOpen && (
            <div className="floating-window-overlay" >
              <div className="floating-window-add">
                <div className="floating-window-header-add">
                  <button button style={{ width: '10%', height: 'auto', cursor: 'pointer', overflow: 'hidden', border: 'none', backgroundColor: 'white', opacity: '0.5', alignSelf: 'top'}}onClick={handleClose2}>
                  <img src="https://cdn-icons-png.flaticon.com/512/130/130882.png" alt="Back Icon" style={{ width: '50%', height: 'auto', objectFit: 'cover'}}></img>
                  
                  </button>
                  <h3>Following</h3>
                </div>

<div className='follow-contain'>
                {Object.values(data).map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
        </div>

              </div>
              <div className="floating-window-backdrop" onClick={handleClose2}></div>
            </div>
          )}
        </>
      );
  }

  
  const UserItem = ({ user }) => {
    
  const [isFollowing, setIsFollowing] = useState(false);

  function handleFollowClick() {
    setIsFollowing((prevIsFollowing) => !prevIsFollowing);
  }
    return (
      <div className="p-user-item">
        <div className="p-user-item-l">
            <img src={user.pfp} alt="Profile" className="p-user-img" />
            <div className="p-user-name">{user.name}</div>
        </div>
        <div className="p-user-item-r">
  <button
    className={`p-user-button ${isFollowing ? "following" : ""}`}
    onClick={handleFollowClick}
    style={{
      backgroundColor: isFollowing ? 'rgba(60, 60, 67, 0.15)' : '#F43F5E',
    }}
  >
    <h4
      style={{
        color: isFollowing ? 'rgba(60, 60, 67, 0.6)' : 'white',
      }}
    >
      {isFollowing ? "Request Sent" : "Follow"}
    </h4>
  </button>
</div>
      </div>
    );
  };
  
  const UsersList = ({ data }) => {
    return (
      <div className="p-user-list-container">
        {Object.values(data).map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  };

 export {FollowingWindow};
  export default FollowersWindow;