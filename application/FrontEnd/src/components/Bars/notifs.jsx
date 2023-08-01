import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/Notif.css';

/*
function Notifications({ notifications }) {
  return (
    <div className="notifications-container">
      <h2 className="notifications-title">Notifications</h2>
      <Link to = "/"><div className="notifications-list">
        {notifications.map(notification => (
          <div key={notification.id} className="notification-item">
            <span className="notification-icon">{notification.icon}</span>
            <div className="notification-content">
              <span className="notification-title">{notification.title}</span>
              <p className="notification-message">{notification.message}</p>
            </div>
          </div>
        ))}
      </div></Link>
    </div>
  );
}*/


function NotifWindow({ data1, data2, handleClose })  {
    const [isOpen, setIsOpen] = useState(true);
   
    const handleOpen = () => {
      setIsOpen(true);
    };
  
    return (
        <>

          {isOpen && (
            <div className="n-floating-window-overlay" >
              <div className="n-floating-window">
                <div className="n-floating-window-header">
                  <button button style={{ width: '25%', height: 'auto', cursor: 'pointer', overflow: 'hidden', border: 'none', backgroundColor: 'white', opacity: '0.5', alignSelf: 'top'}}onClick={handleClose}>
                  <img src="https://cdn-icons-png.flaticon.com/512/130/130882.png" alt="Back Icon" style={{ width: '100%', height: 'auto', objectFit: 'cover'}}></img>
                  
                  </button>
                  <h3>Followers</h3>

                </div>
                  <div className = "n-contain-follow">

                {Object.values(data1).map((user) => (
          <Notifications key={user.id} user={user} />
        ))}
        
                </div>
              </div>
              <div className="n-floating-window-backdrop" onClick={handleClose}></div>
            </div>
          )}
        </>
      );
  }


const Notifications = ({ key, user }) => {
    
    const [isFollowing, setIsFollowing] = useState(null);
  
    const storedPfp = window.sessionStorage.getItem('photo'); 

    const handleFollowClick = (action) => {
        setIsFollowing(action);
      };

      function formatCreationTime(creationTime) {
        const date = new Date(creationTime);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const amPm = hours >= 12 ? "PM" : "AM";
      
        hours = hours % 12 || 12;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
      
        return `${hours}:${minutes} ${amPm}`;
      }


      return (
        <div className="n-user-item">
          <div className="n-user-item-l">
              <img src={storedPfp} alt="Profile" className="n-user-img" />
              
          </div>
          <div className="n-user-item-r">

          <div className="n-user-name">{user.content}</div>

          <div className="n-button-holder">

          <button
      className={`p-user-button ${isFollowing === 'accept' ? "following" : ""}`}
      onClick={() => handleFollowClick('accept')}
      style={{
        backgroundColor: isFollowing === 'accept' ? '#f0c4cc' : '#F43F5E',
      }}
    >
      <h4
        style={{
          color: isFollowing === 'accept' ? '#F43F5E' : 'white',
        }}
      >
        {isFollowing === 'accept' ? "Accepted" : "Accept"}
      </h4>
    </button>

    <button
      className={`p-user-button ${isFollowing === 'reject' ? "following" : ""}`}
      onClick={() => handleFollowClick('reject')}
      style={{
        backgroundColor: isFollowing === 'reject' ? 'rgba(60, 60, 67, 0.55)' : 'rgba(60, 60, 67, 0.15)',
      }}
    >
      <h4
        style={{
          color: isFollowing === 'reject' ? 'white' : 'rgba(60, 60, 67, 0.6)',
        }}
      >
        {isFollowing === 'reject' ? "Rejected" : "Reject"}
      </h4>
    </button>

            </div>

            <div className = "n-time">
                {formatCreationTime(user.creation_time)}
            </div>
          </div>
        </div>
      );
    };

export default NotifWindow;