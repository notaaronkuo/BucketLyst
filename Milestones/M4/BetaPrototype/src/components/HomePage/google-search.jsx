import React, {useRef, useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import { StandaloneSearchBox, LoadScript, GoogleMap } from "@react-google-maps/api";
import "../css/Home.css";
import "../css/HomePage.css"
import { ShowLocationInfo } from "./show-location";
/*
const mapContainerStyle = {
  height: "400px",
  width: "800px",
  top: "100px"
};

const center = {
  lat: 38.685,
  lng: -115.234
};
const searchBoxStyle  = {
  right: "400px"
}

const PlaceComponent = () =>
{
const inputRef = useRef ();
const handlePlaceChanged = () => {
const [place] = inputRef.current.getPlaces();
if(place) {
console.log(place.formatted_address);
console.log(place.geometry.location.lat()); 
console.log(place.geometry.location.lng());
}
};

return (
<LoadScript
  googleMapsApiKey="AIzaSyBPkgUmIztZ4gRO26KQcOHPLI6vS8usMR0" 
  libraries={["places"]}
>

<StandaloneSearchBox

onLoad={ref => (inputRef.current = ref)}
onPlacesChanged={handlePlaceChanged}
>
  <input
    type="text"  
    className="form-control" 
    placeholder="Enter Location"
/>
</StandaloneSearchBox>

</LoadScript>
);
};*/



/*
const PlaceComponent = () =>
{
  const mapContainerStyle = {
    height: "400px",
    width: "800px"
  };
  
  const center = {
    lat: 38.685,
    lng: -115.234
  };
  
  const onLoad = ref => this.searchBox = ref;
  
  const onPlacesChanged = () => console.log(this.searchBox.getPlaces());

  return (
    <LoadScript
  googleMapsApiKey="AIzaSyBPkgUmIztZ4gRO26KQcOHPLI6vS8usMR0" 
  libraries={["places"]}
>

  <GoogleMap
    id="searchbox-example"
    mapContainerStyle={mapContainerStyle}
    zoom={2.5}
    center={center}
  >
    <StandaloneSearchBox
      onLoad={onLoad}
      onPlacesChanged={
        onPlacesChanged
      }
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: "absolute",
          left: "50%",
          marginLeft: "-120px"
        }}
      />
    </StandaloneSearchBox>
  </GoogleMap>
</LoadScript>

  );
}
*/

/*

const mapContainerStyle = {
  height: "400px",
  width: "800px",
  top: "100px"
};

const center = {
  lat: 38.685,
  lng: -115.234
};
const searchBoxStyle  = {
  right: "800px",
  
}

const PlaceComponent = () =>
{
const inputRef = useRef ();
const handlePlaceChanged = () => {
const [place] = inputRef.current.getPlaces();
if(place) {
console.log(place.formatted_address);
console.log(place.geometry.location.lat()); 
console.log(place.geometry.location.lng());
}
};

return (
<LoadScript
  googleMapsApiKey="AIzaSyBPkgUmIztZ4gRO26KQcOHPLI6vS8usMR0" 
  libraries={["places"]}
>
<GoogleMap
    id="searchbox-example"
    mapContainerStyle={mapContainerStyle}
    zoom={2.5}
    center={center}
  >
<StandaloneSearchBox

onLoad={ref => (inputRef.current = ref)}
onPlacesChanged={handlePlaceChanged}
>
  <input
    type="text"  
    className="search-form-control" 
    placeholder="Enter Location"
/>
</StandaloneSearchBox>
</GoogleMap>
</LoadScript>
);
};
export default PlaceComponent;*/

  const mapContainerStyle = {
    height: '90vh',
    width: '100%',

  };

  const PlaceComponent = () => {
    const inputRef = useRef();
    const [center, setCenter] = React.useState({ lat: 37.7749295, lng: -122.4194155});
    const [zoom, setZoom] = useState(10);
    const [expandDiv, setExpandDiv] = useState(false); // New state variable

  /*
    const handlePlaceChanged = () => {
      const [place] = inputRef.current.getPlaces();
      if (place) {
        console.log(place.formatted_address);
        console.log(place.place_id);
        console.log(place.name);
        console.log(place.formatted_phone_number);
        console.log(place.opening_hours);
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
      formattedAddress: 'None',
      placeId: 'None',
      name: 'Enter a Location!',
      phoneNumber: 'None',
      openingHours: 'None',
      /*photos: [],*/
      reservable: 'None',
      latitude: '',
      longitude: '',
    };
    
    
    const handlePlaceChanged = () => {
      const [place] = inputRef.current.getPlaces();
      if (place) {
        data = {
          formattedAddress: place.formatted_address,
          placeId: place.place_id,
          name: place.name,
          adr_address: place.adr_address,
          phoneNumber: place.formatted_phone_number,
          openingHours: place.opening_hours,
          /*photos: place.photos,*/
          website: place.website,
          reservable: place.reservable,
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
      width: expandDiv ? '63%' : '100%'
    };
   

  
    return (<div className = "show-location-container">
      {/*<div className={`shrink-map ${expandDiv ? 'sl-right' : ''}`}>*/}
      <div className="sl-right" style={slRightStyle}>
      <LoadScript googleMapsApiKey="
      AIzaSyBPkgUmIztZ4gRO26KQcOHPLI6vS8usMR0" libraries={['places']}>

       
        <GoogleMap id="searchbox-example" mapContainerStyle={mapContainerStyle} zoom={zoom} center={center}>


        <div className="map-search">
        <StandaloneSearchBox onLoad={(ref) => (inputRef.current = ref)} onPlacesChanged={handlePlaceChanged}>
          <div className="map-search-bar">
            <input
              className="map-search-bar-text"
            
            

 type="text" placeholder="Enter Location" 
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
      {loaded && <ShowLocationInfo placeData={placeData} />}
       </div>
    );
  };
  
  export default PlaceComponent;
  