/*<a href="https://ibb.co/Yhk9m0v"><img src="https://i.ibb.co/Wfy9ZVS/share.png" alt="share" border="0"></a><a href="https://imgbb.com/"><img src="https://i.ibb.co/5RSDTRV/icon-lock.png" alt="icon-lock" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/9YrqSfX/icon-more-vert.png" alt="icon-more-vert" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/T1jV1gv/icon-setting-5.png" alt="icon-setting-5" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/pfjVXZR/icon-share-ios.png" alt="icon-share-ios" border="0"></a> */

import React, { useState } from "react";

import { Link } from "react-router-dom";
import "../css/ListingPage.css";
import ListListing, { ListingEdit } from "./list-listing";
import EachListDummyData from "../DummyData/eachlist-dummy";

import locationsData from "../DummyData/locations-dummy-data";

import {ListListingC, ListFilterC, ListShareC} from "./tasks";


function EachListHeader(props) {
    const { name, subtitle, visibility } = props.data;

    return (
        <div className="each-list-header">

            <div className="elh-r1">
                Edit List
            </div>

            <div className="elh-r2">
  <form className="elh-r2-form">
    <input type="text" defaultValue={name} className="elh-r2-input" />
  </form>
</div>

<div className="elh-r3">
  <form className="elh-r3-form">
    <textarea defaultValue={subtitle} className="elh-r3-textarea" maxlength="200" />
  </form>
</div>

            <div className="elh-r4">
                <div className = "elh-visible" style={{ width: '5%', height: 'auto',  overflow: 'hidden', border: 'none', backgroundColor: 'white',}}>
                    <img className = "visible-img" src="https://i.ibb.co/WzhsYbZ/icon-lock.png" alt="List Icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className = "elh-visible-text">{visibility}</div>
                <div className = "elh-r4-spacer"></div>
                
            </div>

            <div className="elh-r5">
                    <input className = 'elh-search' type="text" placeholder="Search.."></input>
                
            </div>

            <div className="elh-c1">
                <Link to = "eachlist">
                <button className ="elh-edit-button">
                    <img className = "edit-img" src="https://i.ibb.co/G7PkSMf/Left-icon.png" alt="List Icon" style={{ width: 'auto', height: '50%', objectFit: 'cover' }} />
                    <div style = {{fontSize: '1rem'}}>Save</div>
                </button>
                </Link>

            </div>

            <div className="elh-c2">

                    <button className="elh-button">
                        <img className = "sidebar-img" src="https://i.ibb.co/T1jV1gv/icon-setting-5.png" alt="Filter bars" style={{ width: 'auto', height: '80%', objectFit: 'cover' }} />
                        <div className="elh-button-text">Filter</div>
                    </button>
                    
                    <button className="elh-button">
                        <div className="elh-button-text">Sort</div>
                    </button>
                
            </div>

            <div className="elh-e"></div>
        </div>

    );

}

function EachListListing({ locationdata }) {

    


    return (
        <div className="each-list-listing-holder">

{locationsData.map((locationdata) => (
        <ListingEdit key={locationdata.id} locationdata={locationdata} />
      ))}

        </div>

    );

}

function EditListMain() {

  return (
    <div className='main-container'>
        
        <div className= "each-list-container">

        <EachListHeader data={EachListDummyData[1]} />
            <EachListListing locationdata = {locationsData}/>

            <div className= "each-list-map-holder">

                <img className = "eachlist-map" src="https://i.ibb.co/85fw9q6/map-each-lists.png" alt="map-each-lists" border="0"></img>

            </div>

        </div>

  </div>
  );
}


export default EditListMain;