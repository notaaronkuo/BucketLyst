import React, { useEffect } from 'react';

const MapWithPlaceID = ({ placeid }) => {
  // using 'useEffect' hook to run the code when the component mounts or prop changes
    useEffect(() => {
    if (placeid) {
        // creating new google.maps.Map instance and specify to its initial configutation 
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 10,
      });
      
      // Creating new instance of google map place api
      const service = new window.google.maps.places.PlacesService(map);
      // creating getdetails callback method of a placeservice to fetch the place based on 'placeid'
      // check if status is ok to ensure succesfull retrieval of place details
      // id successful , create a google map marker at the location and place the center of the map to the location.
      service.getDetails(
        {
          placeId: placeid,
        },
        (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const marker = new window.google.maps.Marker({
              map: map,
              position: place.geometry.location,
            });
            map.setCenter(place.geometry.location);
          }
        }
      );
    }
  }, [placeid]);
//  returning <div> element to contain the map
  return (
    <div>
      <div id="map" style={{ height: "90vh",
  width: "100%", }}></div>
    </div>
  );
};

export default MapWithPlaceID;
