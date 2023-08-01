import React, { useEffect } from 'react';

const PlaceComponent2 = () => {
  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
      });
      const input = document.getElementById('pac-input');
      // Specify just the place data fields that you need.
      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        fields: ['place_id', 'geometry', 'formatted_address', 'name', 'formatted_phone_number'],
      });

      autocomplete.bindTo('bounds', map);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

      const infowindow = new window.google.maps.InfoWindow();
      const infowindowContent = document.getElementById('infowindow-content');

      infowindow.setContent(infowindowContent);

      const marker = new window.google.maps.Marker({ map: map });

      marker.addListener('click', () => {
        infowindow.open(map, marker);
      });
      autocomplete.addListener('place_changed', () => {
        infowindow.close();

        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
          return;
        }

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }

        // Set the position of the marker using the place ID and location.
        // @ts-ignore This should be in @typings/googlemaps.
        marker.setPlace({
          placeId: place.place_id,
          location: place.geometry.location,
        });
        marker.setVisible(true);
        infowindowContent.children.namedItem('place-name').textContent = place.name;
        infowindowContent.children.namedItem('place-id').textContent = place.place_id;
        infowindowContent.children.namedItem('place-address').textContent = place.formatted_address;
        infowindowContent.children.namedItem('formatted-phone-number').textContent = place.formatted_phone_number;
        infowindow.open(map, marker);
        console.log("place id: " + place.place_id);

      });
    };
  /*  function findDetails(place){
        var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name%2Crating%2Cformatted_phone_number&key=YOUR_API_KEY',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

    };*/

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBPkgUmIztZ4gRO26KQcOHPLI6vS8usMR0&libraries=places&callback=initMap`;
      script.defer = true;
      script.async = true;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  return (
    <div>
      <input id="pac-input" type="text" placeholder="Enter a location" />
      <div id="map" style={{ height: '400px', width: '800px' }}></div>
      <div id="infowindow-content">
        <span id="place-name"></span>
        <span id="place-id"></span>
        <span id="place-address"></span>
        <span id="formatted-phone-number"></span>
      </div>
    </div>
  );
};


function PlaceComponent3() {
  useEffect(() => {
    const loadMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: -33.866, lng: 151.196 },
        zoom: 15,
      });
      const request = {
        placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
        fields: ["name", "formatted_address", "place_id", "geometry"],
      };
      const infowindow = new window.google.maps.InfoWindow();
      const service = new window.google.maps.places.PlacesService(map);

      service.getDetails(request, (place, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          place &&
          place.geometry &&
          place.geometry.location
        ) {
          const marker = new window.google.maps.Marker({
            map,
            position: place.geometry.location,
          });

          window.google.maps.event.addListener(marker, "click", () => {
            const content = document.createElement("div");
            const nameElement = document.createElement("h2");

            nameElement.textContent = place.name;
            content.appendChild(nameElement);

            const placeIdElement = document.createElement("p");

            placeIdElement.textContent = place.place_id;
            content.appendChild(placeIdElement);

            const placeAddressElement = document.createElement("p");

            placeAddressElement.textContent = place.formatted_address;
            content.appendChild(placeAddressElement);
            infowindow.setContent(content);
            infowindow.open(map, marker);
          });
        }
      });
    };

    if (window.google && window.google.maps) {
      loadMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBPkgUmIztZ4gRO26KQcOHPLI6vS8usMR0&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = loadMap;
      document.head.appendChild(script);
    }
  }, []);

  return <div id="map" style={{ height: "400px", width: "800px" }}></div>;
}


  export{PlaceComponent3};
export default PlaceComponent2;
