import React, { useEffect } from 'react';




            const MapWithPlaceID = ({placeid}) => {
  let map, infoWindow;

  useEffect(() => {
    const initMap = () => {
      map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6,
      });
      infoWindow = new window.google.maps.InfoWindow();

      const locationButton = document.createElement("button");

      locationButton.textContent = "Pan to Current Location";
      locationButton.classList.add("custom-map-control-button");

      map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
        locationButton
      );

      locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              infoWindow.setPosition(pos);
              infoWindow.setContent("Location found.");
              infoWindow.open(map);
              map.setCenter(pos);
            },
            () => {
              handleLocationError(true, infoWindow, map.getCenter());
            }
          );
        } else {
          handleLocationError(false, infoWindow, map.getCenter());
        }
      });
    };

    const handleLocationError = (
      browserHasGeolocation,
      infoWindow,
      pos
    ) => {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    };

    window.initMap = initMap;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBPkgUmIztZ4gRO26KQcOHPLI6vS8usMR0&callback=initMap`;
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      delete window.initMap;
      document.body.removeChild(script);
    };
  }, []);

  return <div id="map" style={{ height: "500px" }} />;
};



export default MapWithPlaceID;