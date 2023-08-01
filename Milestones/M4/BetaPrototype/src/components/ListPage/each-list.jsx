/*<a href="https://ibb.co/Yhk9m0v"><img src="https://i.ibb.co/Wfy9ZVS/share.png" alt="share" border="0"></a><a href="https://imgbb.com/"><img src="https://i.ibb.co/5RSDTRV/icon-lock.png" alt="icon-lock" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/9YrqSfX/icon-more-vert.png" alt="icon-more-vert" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/T1jV1gv/icon-setting-5.png" alt="icon-setting-5" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/pfjVXZR/icon-share-ios.png" alt="icon-share-ios" border="0"></a> */

import React, { useState } from "react";
import MakeListWindow from "../ListCardsPage/make-list";

import { Link } from "react-router-dom";
import "../css/ListingPage.css";
import '../css/MakeList.css';


import ListFilter from "./list-filter";
import ListListing from "./list-listing";
import EachListDummyData from "../DummyData/eachlist-dummy";

import {ListListingC, ListFilterC, ListShareC} from "./tasks";
import locationsData from "../DummyData/locations-dummy-data";

const myAPI = "qzkui2lj3d"
const path = '/location?/location_id'

function showLocations(){

}
function EachListHeader(props) {
    const { name, subtitle, visibility } = props.data;

    function handleSort1(){
        console.log("handleSort1 called")
    }

    return (
        <div className="each-list-header">

            <div className="elh-r1">
                My List
            </div>

            <div className="elh-r2">
                
                <div className="elh-r2-text">
                    {name}
                </div>
            </div>

            <div className="elh-r3">
                <button className="elh-link">{subtitle}</button>
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
            
                <button style={{ width: '30%', height: 'auto', cursor: 'pointer', overflow: 'hidden', border: 'none', backgroundColor: 'white',}}>
                    <img className = "edit-img" src="https://i.ibb.co/pfjVXZR/icon-share-ios.png" alt="List Icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>

                <div class="dropdown2">
      <button style={{ width: 'auto', height: '40px', cursor: 'pointer', overflow: 'hidden',fontSize: '1.5em', border: 'none', backgroundColor: 'white', textalign: 'center'}}> 
        <img src="https://i.ibb.co/9YrqSfX/icon-more-vert.png" alt="down Icon" style={{ width: 'auto', height: '5px', objectFit: 'cover' }} />
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <Link to = "/editlist" className="hotbar-soonPage-link">Edit List</Link>
      <Link to = "/home" className="hotbar-makelist-link">Delete List</Link>
    </div>
    </div>


            </div>

            <div className="elh-c2">

                    {/*<button className="elh-button">
                        <img className = "sidebar-img" src="https://i.ibb.co/T1jV1gv/icon-setting-5.png" alt="Filter bars" style={{ width: 'auto', height: '80%', objectFit: 'cover' }} />
                        <div className="elh-button-text">Filter</div>
                    </button>*/}
                    <ListFilter/>
                    
                    <div class="dropdown3 eachlistdropdown">
                    <button className="elh-button">
                        <div className="elh-button-text">Sort</div>
                    </button>
      <div className="dropdown-content3 eachlistdropcontent">

          <button className="eachlistdropbutton" onClick={handleSort1}>
            <h4>Added: New to Old</h4>
          </button>
          <button className="eachlistdropbutton" onClick={handleSort1}>
            <h4>Added: Old to New</h4>
          </button>
          <button className="eachlistdropbutton" onClick={handleSort1}>
            <h4>Price: High to Low</h4>
          </button>
          <button className="eachlistdropbutton" onClick={handleSort1}>
            <h4>Price: Low to High</h4>
          </button>
          <button className="eachlistdropbutton" onClick={handleSort1}>
            <h4>HIghest Rated</h4>
          </button>
      </div>

      </div>
                
            </div>

            <div className="elh-e"></div>
        </div>

    );

}

function EachListListing({ locationdata }) {


    return (
        <div className="each-list-listing-holder">

{locationsData.map((locationdata) => (
        <ListListing key={locationdata.id} locationdata={locationdata} />
      ))}

        </div>

    );

}

function EachListMain() {

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


export default EachListMain;