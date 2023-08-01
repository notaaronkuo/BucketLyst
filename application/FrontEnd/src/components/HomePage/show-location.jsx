import React, { useRef, useEffect, useState }from 'react';
import { Link, useNavigate} from 'react-router-dom';
import "../css/HomePage.css"
import {DummyData5} from '../DummyData/listings-dummy-data';
import MakeListWindow2 from './new-list-home';
import MakeListWindow3 from './add-to-list';
import PlaceComponent from './google-search';
import { API } from 'aws-amplify';

/**<a href="https://imgbb.com/"><img src="https://i.ibb.co/C8yf15L/location-image.png" alt="location-image" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/Z2QMvzG/icon-calendar.png" alt="icon-calendar" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/VSgTVVq/icon-clock.png" alt="icon-clock" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/JR56JrB/Globe.png" alt="Globe" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/DKtQBTS/Phone.png" alt="Phone" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/yFjycT0/icon-map.png" alt="icon-map" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/fvmmktL/icon-route-square.png" alt="icon-route-square" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/sKQ1hCq/icon-save-2.png" alt="icon-save-2" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/XLNF9Kx/image.png" alt="image" border="0"></a> 

<a href="https://imgbb.com/"><img src="https://i.ibb.co/wWMWXtV/icon-add-page.png" alt="icon-add-page" border="0"></a>*/




  console.log('show-location: userID:',JSON.stringify(window.sessionStorage.getItem('userid')));
  console.log(sessionStorage);


  const ShowLocation = () => {
    function signUp() {
      const apiName = 'home';
      const path = '/home';
      const username  = window.sessionStorage.getItem('username');
      const email  = window.sessionStorage.getItem('email');
      console.log('sessionstorage isFunctionCalled');
      console.log('apps: username:', username);
      console.log('apps: email:', email);
      if (sessionStorage.getItem('userid') === null) {
        return new Promise((resolve, reject) => API.get(apiName, path, 
          {
            queryStringParameters: {
              username: username,
              email: email 
            }}).then((response) => {
              console.log('response is: ', response[0]);
              const userid = response['body'][0]['id'];
              const photo = response['body'][0]['photo'];
              window.sessionStorage.setItem('userid', userid);
              window.sessionStorage.setItem('photo', photo);
              console.log('userid: ',userid);
              console.log(typeof userid)
              console.log('apps',sessionStorage);
              console.log('getItem: ', sessionStorage.getItem('userid'));
              sessionStorage.setItem('isFunctionCalled', 'true');
              
            }));
    
      } else {
        console.log('error on signUp at show location');
      }
      
    }
    
      useEffect(() => {
          console.log('useEffect at showlocation is called');
            signUp();
            
          
    });

  
  return (
    <div class = "main-container">
      
        <PlaceComponent/>     

     </div>
  
  );
}

const ShowLocationInfo = ({weekdayText, openNow, placeData}) => {
  const [showWindow, setShowWindow] = useState(false);
  const [showWindow2, setShowWindow2] = useState(false);
  const [Lists, setLists] = useState([]);
  const [listID, setListID] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [title, setTitle] = useState('');
  const [placeID, setPlaceID] = useState('');

const handleNewListClick = () => {
  setShowWindow(true);
};
const handleNewLocationClick = () => {
  setShowWindow2(true);
};

const handleClose = () => {
  setShowWindow(false);
};

const handleAddToListClick = (listID, Latitude, Longitude, title, placeID) => {
  setListID(listID);
  setLatitude(Latitude);
  setLongitude(Longitude);
  setTitle(title);
  setPlaceID(placeID);
  handleNewLocationClick();

};

const handleClose2 = () => {
  setShowWindow2(false);
};

console.log(sessionStorage);

const navigate = useNavigate();

function handleClick3() {
  navigate("/implementlater");
}
async function getListInfo() {
  console.log("Retrieving List Data");
  
  const userID = sessionStorage.getItem('userid');
  console.log("user id check:" + sessionStorage.getItem('userID'));

  //const apiUrl = `https://dz778zd692.execute-api.us-east-1.amazonaws.com/finaldev/viewlist?listType=myList&userid=${userID}`;
  const apiUrl = `https://q1o6n15415.execute-api.us-east-1.amazonaws.com/finaldev/search/lists/all`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("data received:", data);
    const fetchedLists = data.result.map((list) => ({
      listID: list.listID,
      title: list.title,
      description: list.description,
      visibility: list.visibility,
      ownerID: list.ownerID,
      ownerUsername: list.ownerUsername,
      ownerProfile: list.ownerProfile,
      bookmarks: list.bookmarks,
      tags: list.tags,
      place_id: list.place_id
    }));
    setLists(fetchedLists);
    console.log("API request received with MyLists:", fetchedLists);
  } catch (error) {
    console.log("API request has failed:", error);
  }
}


const rating = Math.round(placeData.rating); // Round the decimal value to the nearest integer

let stars;

if (rating === 5) {
  stars = "★★★★★";
} else if (rating === 4) {
  stars = "★★★★";
} else if (rating === 3) {
  stars = "★★★";
} else if (rating === 2) {
  stars = "★★";
} else if (rating === 1) {
  stars = "★";
} else {
  stars = <p>No rating available</p>;
}

const [currentDay, setCurrentDay] = useState('');

const [dropdownVisible, setShowDropdown] = useState(false);



const handleButtonClick = () => {
  setShowDropdown(!dropdownVisible);
  console.log("Hours? :" + openNow);
  console.log("weekday hours:" + weekdayText);
};

const handleBack = () => {
  window.location.reload();
};


const handleDaySelect = (day) => {
  // Set the current day when a dropdown item is selected
  setCurrentDay(day);
};

const buttonLabel = openNow ? 'Open Now' : 'Closed Now';

useEffect(() => {
  getListInfo();
  console.log("API contents:", Lists);
}, []);



  return (
    <div className = "sl-left">
          <div className = "sl-r1">
            
            <button className = "sl-back"
             onClick = {handleBack}>
            
                  <img src="https://cdn-icons-png.flaticon.com/512/130/130882.png" alt="Back Icon" style={{ width: 'auto', height: '100%', objectFit: 'cover', padding: '5px'}}></img>
                 
                  </button>
                  
          </div>
          
          <div className = "sl-r2">
           
            <div className = "sl-r2-text">{placeData.name ? placeData.name : <p> No name</p>}</div>

          </div>

          <div className = "sl-r3">
            {/*<img src="https://i.ibb.co/XLNF9Kx/image.png" alt="Back Icon" style={{ width: 'auto', height: '40%', objectFit: 'cover', alignSelf: 'center'}}></img>*/}
            <div className = "sl-r3-price-level">
            {
              placeData.price_level === 4 ? '$$$$' :
              placeData.price_level === 3 ? '$$$' :
              placeData.price_level === 2 ? '$$' :
              placeData.price_level === 1 ? '$' :
              <p>No Pricing Available</p>
            }
            </div>
            
            <div className="sl-r3-text">
  {placeData.adr_address ? (
    <>
      <span className="locality">&nbsp;&nbsp;
        {placeData.adr_address.match(/<span class="locality">(.*?)<\/span>/)?.[1]}
      </span>
      <span className="region">&nbsp;&nbsp;
        {placeData.adr_address.match(/<span class="region">(.*?)<\/span>/)?.[1]}
      </span>
      <span className="postal-code">&nbsp;&nbsp;
        {placeData.adr_address.match(/<span class="postal-code">(.*?)<\/span>/)?.[1]}
      </span>
    </>
  ) : (
    <p>No Address</p>
  )}
</div>



          </div>
          <div className = "sl-r4">
            {/*<img src="https://i.ibb.co/C8yf15L/location-image.png" alt="Resturaunt Image" style={{ width: 'auto', height: '90%', objectFit: 'cover'}}></img>*/}
            <LocationImage key={placeData.placeId} place_id={placeData.placeId} />
     

          </div>
          <div className = "sl-r5">
{/*
          <button className='sl-buttons' onClick={openButtonWindow}>
        <img src="https://i.ibb.co/sKQ1hCq/icon-save-2.png" alt="Save icon" style={{ width: 'auto', height: 'auto', objectFit: 'cover'}}></img>
        Save
      </button>
  {isButtonWindowOpen && <ButtonWindow onClose={closeButtonWindow} />}*/}
 <div class="dropdown3">
<button className='sl-buttons save-sl'>
        <img src="https://i.ibb.co/sKQ1hCq/icon-save-2.png" alt="Save icon" style={{ width: 'auto', height: 'auto', objectFit: 'cover'}}></img>
        &nbsp;&nbsp;Save to list
     
      </button>
      {showWindow && <MakeListWindow2 handleClose={handleClose} />}
      {showWindow2 && <MakeListWindow3 handleClose2={handleClose2} listID={listID} latitude={latitude} longitude={longitude} titlel={title} placeID={placeID}/>}

      <div className="dropdown-content3">
        
      {Object.values(Lists).map((item) => (
  item.ownerID === parseInt(sessionStorage.getItem('userid')) ? (
    <button key={item.id} className="dropdown-lists-button" onClick={() => handleAddToListClick(item.listID, placeData.latitude, placeData.longitude, placeData.title, placeData.placeId)}>
      {item.title}
    </button>
  ) : null
))}

        
        <button className="dropdown-lists-button dlb-new" onClick={handleNewListClick}>
          New List&nbsp;&nbsp;
          <img src="https://i.ibb.co/wWMWXtV/icon-add-page.png" alt="icon-add-page"style={{ width: '20%', height: '20%', objectFit: 'cover' }} />
          </button>
      </div>

      </div>
{/*
            <button className='sl-buttons nav-sl' onClick={handleClick3}>
            <img src="https://i.ibb.co/fvmmktL/icon-route-square.png" alt="Route icon" style={{ width: 'auto', height: 'auto', objectFit: 'cover'}}></img>
            &nbsp;&nbsp;Navigation</button>
*/}
          </div>

          <div className = "sl-r6big">


            <div className = "sl-r6-top-address">
              
                <div className = "sl-label-top">
                  <img className = "s1-label-top-image" src="https://i.ibb.co/yFjycT0/icon-map.png" alt="Map Icon" style={{ width: 'auto', height: '30px', objectFit: 'cover' }} />
                  <div className = "sl-label-top-title">
                  &nbsp;&nbsp;Address
                  </div>

                </div>
                <div className = "sl-label-bottom">
                {placeData.formattedAddress ? placeData.formattedAddress: <p> No Address</p>}
                </div>

            </div>
<div className = "sl-divider">
              <div className = "sl-r6-bottom-items-h">

                  <div className = "sl-label-top">
                    <img className = "s1-label-top-image" img src="https://i.ibb.co/DKtQBTS/Phone.png" alt="Phone" style={{ width: 'auto', height: '30px', objectFit: 'cover' }} />
                    <div className = "sl-label-top-title">
                      &nbsp;&nbsp;Phone
                    </div>
                  </div>
                  <div className = "sl-label-bottom">
                  {placeData.phoneNumber? placeData.phoneNumber: <p> No Phone Number</p>}
                  </div>

              </div>
              <div className = "sl-r6-bottom-items-h">
              
              <div className = "sl-label-top">
                <img className = "s1-label-top-image" img src="https://cdn-icons-png.flaticon.com/512/1828/1828970.png" alt="icon-calendar" style={{ width: 'auto', height: '30px', objectFit: 'cover' }} />
                <div className = "sl-label-top-title">
                  &nbsp;&nbsp;Rating
                </div>
              </div>
              <div className = "sl-label-bottom-stars">
              <div className="sl-star-rating">{stars}</div>
            
              </div>
              
          </div>
          </div>

              <div className = "sl-r6-bottom-items">
              
                  <div className = "sl-label-top">
                    <img className = "s1-label-top-image" img src="https://i.ibb.co/JR56JrB/Globe.png" alt="Globe"style={{ width: 'auto', height: '30px', objectFit: 'cover' }} />
                    <div className = "sl-label-top-title">
                      &nbsp;&nbsp;Website
                    </div>
                  </div>
                  <div className = "sl-label-bottom">
                  {placeData.website ? placeData.website: <p> No Website</p>}
                  </div>
                  
              </div>

             
        

              
              
              <div className = "sl-r6-phone">
              
                  <div className = "sl-label-top-p">
                    <img className = "s1-label-top-image" img src="https://i.ibb.co/VSgTVVq/icon-clock.png" alt="icon-clock" style={{ width: 'auto', height: '30px', objectFit: 'cover' }} />
                    <div className = "sl-label-top-title">
                      &nbsp;&nbsp;Hours
                    </div>
                  </div>

                  <div className = "sl-label-bottom-p">
                 
                  <button
        className="status-button"
        onClick={handleButtonClick}
      >
        {buttonLabel}
      </button>
      {dropdownVisible && (
        <div className="sl-dropdown">
          {weekdayText && weekdayText.length > 0 ? (
            <ul className="weekday-list">
              {weekdayText.map((text) => {
                const [day, hours] = text.split(': ');
                const isSelected = day === currentDay;
                return (
                  <li
                    key={day}
                    className={isSelected ? 'bold' : ''}
                    onClick={() => handleDaySelect(day)}
                  >
                    {text}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No hours available</p>
          )}
        </div>
      )}

                  </div>
                  
              </div>
              </div>



          </div>
          

  )
}

const LocationImage = ({ place_id }) => {
  useEffect(() => {
    const attributions = document.getElementById("attributions");
    const service = new window.google.maps.places.PlacesService(attributions);
    const request = {
      placeId: place_id
    };
    console.log("check if place_id exists: " + place_id);

    service.getDetails(request, function (place, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        
        const src = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${lat},${lng}&key=AIzaSyBPkgUmIztZ4gRO26KQcOHPLI6vS8usMR0`;
        console.log("Place grabbed from" + src);

        document.getElementById("image").src = src;
      } else {console.log("Unsuccessful");}
    });
  }, []);

  return (
    <>
      <div id="attributions"></div>

      <img src="" id="image" alt="Street View" 
      style={{ width: 'auto', height: '90%', objectFit: 'cover'}}/>
    </>
  );
};


export {ShowLocationInfo, LocationImage};
export default ShowLocation;