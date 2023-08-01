import React, { useState } from "react";

import { Link } from "react-router-dom";
import "../css/ListingPage.css";
import "../css/Profile.css";
import "../css/import.css";

import ListListing from "./list-listing";
import ListFilter from "./list-filter";
import ListShare from "./list-share";
import AccountDelete from "../account-delete";
import ImportSuccess from "../ListCardsPage/import-messages";
import {ImportFail} from "../ListCardsPage/import-messages";


function ListFilterC() {

  return (
    <div className="list-filter-contain">
      <ListFilter/>
    </div>
  );
}

function ListListingC() {

  return (
    <div className="list-listing-contain">
      <ListListing/>
    </div>
  );
}
function ListShareC() {

  return (
    <div className="list-share-contain">
      <ListShare/>
    </div>
  );
}

function AccountDeleteC() {

  return (
    <div className="account-delete-contain">
      <AccountDelete/>
    </div>
  );
}

function ImportSuccessC() {

  return (
    <div className="import-contain">
      <ImportSuccess/>
    </div>
  );
}

function ImportFailC() {

  return (
    <div className="import-contain">
      <ImportFail/>
    </div>
  );
}
function ListMain() {
  const [activeComponent, setActiveComponent] = useState("component1");

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div className='main-container'>
    <div className = "task-assign">

    <div className = "task-bholder">
      <button className = {activeComponent === "component1" ? "tasks-buttons-active" : "tasks-buttons"} onClick={() => handleButtonClick("component1")}>Tommy</button>
      <button className = {activeComponent === "component2" ? "tasks-buttons-active" : "tasks-buttons"} onClick={() => handleButtonClick("component2")}>Kenny</button>
      <button className = {activeComponent === "component22" ? "tasks-buttons-active" : "tasks-buttons"} onClick={() => handleButtonClick("component22")}>Kenny Task 2</button>
      <button className = {activeComponent === "component3" ? "tasks-buttons-active" : "tasks-buttons"} onClick={() => handleButtonClick("component3")}>Rabin</button>
      <button className = {activeComponent === "component11" ? "tasks-buttons-active" : "tasks-buttons"} onClick={() => handleButtonClick("component11")}>Tommy ImportSuccess</button>
      <button className = {activeComponent === "component111" ? "tasks-buttons-active" : "tasks-buttons"} onClick={() => handleButtonClick("component111")}>Tommy ImportFail</button>
  
      </div>

      {activeComponent === "component1" && <ListFilterC />}
      {activeComponent === "component2" && <ListListingC />}
      {activeComponent === "component22" && <AccountDeleteC />}
      {activeComponent === "component3" && <ListShareC />}
      {activeComponent === "component11" && <ImportSuccessC />}
      {activeComponent === "component111" && <ImportFailC />}
    </div>

    
  </div>
  );
}

export {ListShareC, ListFilterC, ListListingC, AccountDeleteC, ImportSuccessC, ImportFailC};
export default ListMain;