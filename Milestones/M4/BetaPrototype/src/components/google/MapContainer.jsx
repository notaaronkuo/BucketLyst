import React, { useEffect, useRef } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 0,
  lng: 0,
};

function MapContainer({ locations }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadMap = () => {
      mapRef.current = new window.google.maps.Map(document.getElementById('map'), {
        center,
        zoom: 2,
      });

      if (Array.isArray(locations)) {
        locations.forEach((location) => {
          new window.google.maps.Marker({
            position: location.coordinates,
            map: mapRef.current,
          });
        });
      }
    };

    const loadGoogleMapsAPI = () => {
      window.initMap = loadMap;
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBPkgUmIztZ4gRO26KQcOHPLI6vS8usMR0&libraries=places&callback=initMap';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    if (window.google && window.google.maps) {
      loadMap();
    } else {
      loadGoogleMapsAPI();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current = null;
      }
    };
  }, [locations]);

  return <div id="map" style={containerStyle}></div>;
}

export default MapContainer;