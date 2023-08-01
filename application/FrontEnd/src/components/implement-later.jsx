
import React, { useState } from 'react';
import MapContainer from './google/MapContainer';
import LocationDetails from './google/LocationDetails';
import SearchBar from './google/SearchBar';
import LocationList from './google/LocationList';
import PlaceComponent from './HomePage/google-search';
import PlaceComponent2 from './google/search2';
import {PlaceComponent3} from './google/search2';
import MapWithPlaceID from './google/rabin-map';
/*      <div className = "map-stack"
      style = {{display: 'flex', flexDirection:'column'}}>
      <PlaceComponent/>

      </div>*/ 


const ImplementLater = () => {

  const place_id = "ChIJN1t_tDeuEmsRUsoyG83frY4";


  return (
    <div className='main-container'>

      {/*Insert code calling your components here, 
      make more files in the google folder of the component
      you make, if you want to call your component, import it in the
      statement and call it like this <MyComponent/>
    
      */}
      <MapWithPlaceID placeid = {place_id}/>

    </div>
  );
};

export default ImplementLater;