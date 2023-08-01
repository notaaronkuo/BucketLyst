import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import "../css/import.css";

import { Link } from "react-router-dom";

function ImportSuccess() {
  const navigate = useNavigate();
  function handleExit() {
    navigate("/eachlist");
  }

  return (
      <div className="import-card">
        <h2 className="import-success">Success!</h2>
        <img
          className="import-image"
          src="https://i.ibb.co/W2CNySX/Success.png"
          alt="Your Image"
        />
        <h3 className="import-description">
          Your list has been successfully imported and created!
        </h3>
        <button onClick = {handleExit} className="import-button">Continue</button>
      </div>
 
  );
}

function ImportFail() {
  function refresh() {
    window.location.reload(false);
  }
  return (
      <div className="import-card">
        <h2 className="import-failure">Oops!</h2>
        <img
          className="import-image-failure"
          src="https://i.ibb.co/PzH6M7D/Fail.png"
          alt="Your Image"
        />
        <h3 className="import-description-failure">
          Sorry, there was an issue with the URL you provided or the list is not
          set to public.
          <br />
        </h3>
        <h3 className="import-description-failure">
          Please make sure the URL is correct and that the list is set to public
          so that we can retrieve the information you're looking for.
          <br />
        </h3>
        <button onClick = {refresh}  className="import-button-failure">Try Again</button>
      </div>
  );
}


function ListSuccess() {
  const navigate = useNavigate();
  function handleExit() {
    navigate("/eachlist");
  }

  return (
      <div className="import-card">
        <h2 className="import-success">Success!</h2>
        <img
          className="import-image"
          src="https://i.ibb.co/W2CNySX/Success.png"
          alt="Your Image"
        />
        <h3 className="import-description">
          Your list has been successfully created!
        </h3>
        <button onClick = {handleExit} className="import-button">View List</button>
      </div>
 
  );
}
function ListFail() {
  function refresh() {
    window.location.reload(false);
  }
  return (
      <div className="import-card">
        <h2 className="import-failure">Oops!</h2>
        <img
          className="import-image-failure"
          src="https://i.ibb.co/PzH6M7D/Fail.png"
          alt="Your Image"
        />
        <h3 className="import-description-failure">
          Sorry, your List could not be created at this time
          <br />
        </h3>
        <h3 className="import-description-failure">
          Please try again later
          <br />
        </h3>
        <button onClick = {refresh}  className="import-button-failure">Try Again</button>
      </div>
  );
}

export { ImportFail, ListSuccess, ListFail };
export default ImportSuccess;
