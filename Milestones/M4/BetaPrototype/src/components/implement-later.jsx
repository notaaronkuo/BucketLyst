
import React, { useState } from 'react';
import MapContainer from './google/MapContainer';
import LocationDetails from './google/LocationDetails';
import SearchBar from './google/SearchBar';
import LocationList from './google/LocationList';
import PlaceComponent from './HomePage/google-search';
import PlaceComponent2 from './google/search2';
import {PlaceComponent3} from './google/search2';
const ImplementLater = () => {


  return (
    <div className='main-container'>
      <div className = "map-stack"
      style = {{display: 'flex', flexDirection:'column'}}>
      <PlaceComponent/>

      </div>


    </div>
  );
};

export default ImplementLater;