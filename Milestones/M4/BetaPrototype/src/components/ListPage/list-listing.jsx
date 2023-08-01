import React, { useState } from "react";

import { Link } from "react-router-dom";
import "../css/ListingPage.css";

//For Kenny's part
//I highly recommend using the Flex property, flex within flex is a good tool
//helpful guide for Flex: https://css-tricks.com/snippets/css/a-guide-to-flexbox/

function ListListing({locationdata}) {

  return (
    <div className="list-listing">
      <div className="thumbnail-holder">
      <img
        className="thumbnail"
        src={locationdata.image} 
        alt={locationdata.name}
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
            {locationdata.tags.join(", ")}
          </div>
        </div>
    </div>
  );
}

function ListingEdit({locationdata})  {

  return (
    <div className="list-listing">
      <div className="thumbnail-holder">
      <img
        className="thumbnail"
        src={locationdata.image} 
        alt={locationdata.name}
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
            {locationdata.tags.join(", ")}
          </div>
        </div>
    </div>
  );
}

export {ListingEdit};
export default ListListing;