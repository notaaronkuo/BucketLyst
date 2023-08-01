import React, { useRef, useEffect, useState }from 'react';
import { Link, useNavigate} from 'react-router-dom';
import "../css/HomePage.css"
import {DummyData5} from '../DummyData/listings-dummy-data';
import MakeListWindow2 from './new-list-home';
import MakeListWindow3 from './add-to-list';
import PlaceComponent from './google-search';

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



  const ShowLocation = () => {
  
  return (
    <div class = "main-container">
      
        <PlaceComponent/>     

     </div>
  
  );
}

const ShowLocationInfo = ({placeData}) => {
  const [showWindow, setShowWindow] = useState(false);
  const [showWindow2, setShowWindow2] = useState(false);

const handleNewListClick = () => {
  setShowWindow(true);
};

const handleClose = () => {
  setShowWindow(false);
};

const handleAddToListClick = () => {
  setShowWindow2(true);
};

const handleClose2 = () => {
  setShowWindow2(false);
};

const navigate = useNavigate();

function handleClick3() {
  navigate("/implementlater");

}

  return (
    <div className = "sl-left">
          <div className = "sl-r1">
            
            <button className = "sl-back">
            <Link to = "/home">
                  <img src="https://cdn-icons-png.flaticon.com/512/130/130882.png" alt="Back Icon" style={{ width: 'auto', height: '50%', objectFit: 'cover'}}></img>
                  </Link>
                  </button>
                  
          </div>
          
          <div className = "sl-r2">
           
            <div className = "sl-r2-text">{placeData.name ? placeData.name : <p> No name</p>}</div>

          </div>

          <div className = "sl-r3">
            <img src="https://i.ibb.co/XLNF9Kx/image.png" alt="Back Icon" style={{ width: 'auto', height: '40%', objectFit: 'cover', alignSelf: 'center'}}></img>
            
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
            <LocationImage place_id={placeData.placeId}/>
     

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
        &nbsp;&nbsp;Save
     
      </button>
      {showWindow && <MakeListWindow2 handleClose={handleClose} />}
      {showWindow2 && <MakeListWindow3 handleClose2={handleClose2} />}

      <div className="dropdown-content3">
        {Object.values(DummyData5).map((item) => (
          <button key={item.id} className="dropdown-lists-button" onClick={handleAddToListClick}>
            {item.name}
          </button>
        ))}
        
        <button className="dropdown-lists-button dlb-new" onClick={handleNewListClick}>
          New List&nbsp;&nbsp;
          <img src="https://i.ibb.co/wWMWXtV/icon-add-page.png" alt="icon-add-page"style={{ width: '20%', height: '20%', objectFit: 'cover' }} />
          </button>
      </div>

      </div>

            <button className='sl-buttons nav-sl' onClick={handleClick3}>
            <img src="https://i.ibb.co/fvmmktL/icon-route-square.png" alt="Route icon" style={{ width: 'auto', height: 'auto', objectFit: 'cover'}}></img>
            &nbsp;&nbsp;Navigation</button>

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

            <div className = "sl-r6-bottom">

              <div className = "sl-r6-bottom-items">

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
              
              <div className = "sl-r6-bottom-items">
              
                  <div className = "sl-label-top">
                    <img className = "s1-label-top-image" img src="https://i.ibb.co/VSgTVVq/icon-clock.png" alt="icon-clock" style={{ width: 'auto', height: '30px', objectFit: 'cover' }} />
                    <div className = "sl-label-top-title">
                      &nbsp;&nbsp;Hours
                    </div>
                  </div>
                  <div className = "sl-label-bottom">
                  {placeData.opening_hours ? placeData.opening_hours: <p> No Hours Listed</p>}
                  </div>
                  
              </div>
              <div className = "sl-r6-bottom-items">
              
                  <div className = "sl-label-top">
                    <img className = "s1-label-top-image" img src="https://i.ibb.co/Z2QMvzG/icon-calendar.png" alt="icon-calendar" style={{ width: 'auto', height: '30px', objectFit: 'cover' }} />
                    <div className = "sl-label-top-title">
                      &nbsp;&nbsp;Reservations
                    </div>
                  </div>
                  <div className = "sl-label-bottom">
                  {placeData.reservable ? (
  <p>Yes</p>
) : placeData.reservable === null ? (
  <p>No</p>
) : (
  <p>No Hours</p>
)}
                  </div>
                  
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


export {ShowLocationInfo};
export default ShowLocation;