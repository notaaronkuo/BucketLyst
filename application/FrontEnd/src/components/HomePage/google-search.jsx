import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  StandaloneSearchBox,
  LoadScript,
  GoogleMap,
} from "@react-google-maps/api";
import "../css/Home.css";
import "../css/HomePage.css";
import { ShowLocationInfo } from "./show-location";
import MapWithPlaceID from "../google/rabin-map";


const mapContainerStyle = {
  height: "90vh",
  width: "100%",
};

const PlaceComponent = () => {
  const inputRef = useRef();
  const [center, setCenter] = React.useState({
    lat: 37.7749295,
    lng: -122.4194155,
  });
  const [zoom, setZoom] = useState(15);
  const [expandDiv, setExpandDiv] = useState(false); // New state variable

  /*
    const handlePlaceChanged = () => {
      const [place] = inputRef.current.getPlaces();
      if (place) {
        console.log(place.formatted_address);
        console.log(place.place_id);
        console.log(place.name);
        console.log(place.formatted_phone_number);
        console.log(place.photos);
        console.log(place.reservable);
        console.log(place.geometry.location.lat());
        console.log(place.geometry.location.lng());
        setCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        // Set the desired zoom level
        const desiredZoomLevel = 15;
        setZoom(desiredZoomLevel);
      }
      
    };*/
  const [placeData, setPlaceData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  let data = {
    formattedAddress: "None",
    placeId: "None",
    name: "Enter a Location!",
    phoneNumber: "None",
    openingHours: [],
    /*photos: [],*/
    reservable: "None",
    latitude: "",
    longitude: "",
  };

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      data = {
        formattedAddress: place.formatted_address,
        placeId: place.place_id,
        name: place.name,
        adr_address: place.adr_address,
        price_level: place.price_level,
        phoneNumber: place.formatted_phone_number,
        openingHours: place.opening_hours,
        /*photos: place.photos,*/
        website: place.website,
        rating: place.rating,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      };

      console.log(data);

      setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });

      setPlaceData(data);
      const desiredZoomLevel = 15;
      setZoom(desiredZoomLevel);
      setExpandDiv(true);
      setLoaded(true);
    }
  };
  const slRightStyle = {
    width: expandDiv ? "63%" : "100%",
  };

  return (
    <div className="show-location-container">
      {/*<div className={`shrink-map ${expandDiv ? 'sl-right' : ''}`}>*/}
      <div className="sl-right" style={slRightStyle}>
        <LoadScript
          googleMapsApiKey="
      AIzaSyBPkgUmIztZ4gRO26KQcOHPLI6vS8usMR0"
          libraries={["places"]}
        >
          <GoogleMap
            id="searchbox-example"
            mapContainerStyle={mapContainerStyle}
            zoom={zoom}
            center={center}
          >
            <div className="map-search">
              <StandaloneSearchBox
                onLoad={(ref) => (inputRef.current = ref)}
                onPlacesChanged={handlePlaceChanged}
              >
                <div className="map-search-bar">
                  <input
                    className="map-search-bar-text"
                    type="text"
                    placeholder="Enter Location"
                  ></input>
                </div>
              </StandaloneSearchBox>
              {/*}    <button className="home-search-button">
              <img
                className="edit-img"
                src="https://i.ibb.co/hmwC2rg/icon-search.png"
                alt="List Icon"
                style={{ width: "auto", height: "50%", objectFit: "cover" }}
              />
            </button>
         */}
            </div>
          </GoogleMap>
        </LoadScript>
      </div>
      {!loaded ? ( 
      <>
      <div className="floating-window-overlayy">
      <div className="loading-icon-holder">
              <div className="loading-icon">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <h1>If page takes too long to load, consider refreshing the page!</h1>
      </div> 
      </>) :<></>
      
      }
      {loaded && 
       <ShowLocationInfo
    weekdayText={placeData?.openingHours?.weekday_text}
    openNow={placeData?.openingHours?.open_now}
    placeData={placeData}
   />}
    {/*loaded && <MapWithPlaceID placeid={placeData?.place_id} />*/}

    </div>
  );
};

export default PlaceComponent;
