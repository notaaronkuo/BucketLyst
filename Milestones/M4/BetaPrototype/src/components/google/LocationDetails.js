import React, { useEffect, useState } from 'react';

const LocationDetails = ({ lat, lng }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const google = window.google;
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    const request = {
      location: new google.maps.LatLng(lat, lng),
      radius: 1000,
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setLocation(results[0]);
      }
    });
  }, [lat, lng]);

  return (
    <div>
      {location && (
        <div>
          <h2>{location.name}</h2>
          {location.photos && location.photos.length > 0 ? (
            <img
              src={'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${location.photos[0].photo_reference}&key=AIzaSyBPkgUmIztZ4gRO26KQcOHPLI6vS8usMR0'
              }
              alt={location.name}
            />
          ) : (
            <p>No photos available</p>
          )}
          <p>{location.formatted_address}</p>
          <button onClick={() => {}}>Save Location</button>
        </div>
      )}
    </div>
  );
};

export default LocationDetails;