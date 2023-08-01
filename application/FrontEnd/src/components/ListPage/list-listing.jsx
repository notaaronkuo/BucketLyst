import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import "../css/ListingPage.css";
import EditLocation from "./edit-location";
//import { LocationImage } from "../HomePage/show-location";
//For Kenny's part
//I highly recommend using the Flex property, flex within flex is a good tool
//helpful guide for Flex: https://css-tricks.com/snippets/css/a-guide-to-flexbox/

function ListListing({locationdata, setPlaceID}) {
  const [locationDataTags, setLocationDataTags] = useState([]);

  const handleClickMap = () => {
    setPlaceID(locationdata.place_id)
    console.log("Click!")
  }

  useEffect(() => {
   

    if (typeof locationdata.tags === 'string') {
      setLocationDataTags(locationdata.tags.split(','));
    } else if (locationdata.tags) {
      setLocationDataTags(locationdata.tags.toString().split(','));
    }
  }, [locationdata.tags]);

  return (
    <div className="list-listing" onClick={handleClickMap}>
      <div className="thumbnail-holder">
      {/*<LocationImage key={locationdata.place_id} place_id={locationdata.place_id} />*/}
     
     
      <img
        className="thumbnail"
        src = {`https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${locationdata.latitude},${locationdata.longitude}&key=AIzaSyBPkgUmIztZ4gRO26KQcOHPLI6vS8usMR0`}
      
         style={{ width: '100%', height: '100%',  position: 'relative'}}
      />
      </div>
        <div className="info">
          <div className="restaurantname">
            
          {locationdata.name}
          </div>
          <div className="description">
          {locationdata.description}
          </div>
          <div className="rating">
            Rating:&nbsp;
            <div className="starss">
    {Array.from({ length: Math.floor(locationdata.rating) }, (_, index) => (
      <span className="gold-starr" key={index}>&#9733;</span>
    ))}
    {locationdata.rating % 1 !== 0 && (
      <span className="gold-starr" style={{ width: `${(locationdata.rating % 1) * 100}%` }}>
        &#9733;
      </span>
    )}
  </div>
          </div>
          <div className="categories">
            {locationDataTags.join(", ")}
          </div>
        </div>
    </div>
  );
}

const ListingEdit = ({ locationdata, onDelete }) => {
  const handleDeletingFromMap = () => {
    console.log("deleting " + locationdata.id);
    // Call the onDelete function with the ID of the location data
    onDelete(locationdata.id);
  };

  const [showWindow2, setShowWindow2] = useState(false);

  const handleAddToListClick = () => {
    setShowWindow2(true);
  };
  
  const handleClose2 = () => {
    setShowWindow2(false);
  };


  return (
    <div className="list-listing">
      {console.log("locationdata.id is " + locationdata.id)}
      <div className="thumbnail-holder">
      <img
        className="thumbnail"
        src={locationdata.image} 
        alt={locationdata.name}
         style={{ width: '100%', height: '100%',  position: 'relative'}}
      />
      </div>
        <div className="info">
          <div className = "info-edit">
            <div className="restaurantname-edit">
              {locationdata.name}
            </div>
            <div className="buttonholder-edit">
            <button className="edit-location-button" onClick={handleDeletingFromMap}>
              X
            </button>
            <button className="edit-location-button" onClick={handleAddToListClick}>
              Edit
            </button>
            </div>
          </div>
          <div className="description">
          {locationdata.description}
          </div>
          <div className="rating">
            Rating:&nbsp;
            <div className="starss">
    {Array.from({ length: Math.floor(locationdata.rating) }, (_, index) => (
      <span className="gold-starr" key={index}>&#9733;</span>
    ))}
    {locationdata.rating % 1 !== 0 && (
      <span className="gold-starr" style={{ width: `${(locationdata.rating % 1) * 100}%` }}>
        &#9733;
      </span>
    )}
  </div>
          </div>
          <div className="categories">
            {locationdata.tags.join(", ")}
          </div>
        </div>

        {showWindow2 && <EditLocation handleClose2={handleClose2} locationdata={locationdata} />}

    </div>
  );
}
/*

const LocationImage = ({ place_id }) => {
  useEffect(() => {
    console.log("attmept with" + place_id);
    const loadGoogleMapsAPI = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBPkgUmIztZ4gRO26KQcOHPLI6vS8usMR0&libraries=places`;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initializeGoogleMaps = () => {
      const attributions = document.getElementById("attributions");
      const service = new window.google.maps.places.PlacesService(attributions);
      const request = {
        placeId: place_id
      };

      service.getDetails(request, function (place, status) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const src = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${lat},${lng}&key=AIzaSyBPkgUmIztZ4gRO26KQcOHPLI6vS8usMR0`;
          document.getElementById("image").src = src;
        } else {
          console.log("Unsuccessful");
        }
      });
    };

    if (!window.google) {
      loadGoogleMapsAPI()
        .then(initializeGoogleMaps)
        .catch(error => {
          console.error('Error loading Google Maps API:', error);
        });
    } else {
      initializeGoogleMaps();
    }
  }, [place_id]);

  return (
    <>
      <div id="attributions"></div>

      <img src="" id="image" alt="Street View" 
        style={{ width: 'auto', height: '90%', objectFit: 'cover' }} />
    </>
  );
};

*/
export {ListingEdit};
export default ListListing;