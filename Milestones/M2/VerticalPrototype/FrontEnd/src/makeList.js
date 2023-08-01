import React from "react";
import { Link } from "react-router-dom";
import "./makeList.css";

/*
function makeList() {
  return (  
    <h1>Make list</h1>
  );
}
*/

function makeList() {
  return (
    <div class="makelist-area1">
      <div class="makelist-area">
        <div class="makelist-title"> Make your list</div>
        <div class="makelist-content">
          <form className="member-form">
            <div class="makelist-Fill-Ins">
              <div class="makelistValidation">
                <label for="m-username">New List name</label>
                <input
                  type="text"
                  placeholder="Enter your new list name"
                  id="list-name"
                />
                <small>Error message</small>
              </div>

              <div class="makelistValidation">
                <label for="m-email">Location Name:</label>
                <input
                type="text"
                placeholder="The vibes are immaculate"
                id="list-location"
                />
                <small>Error message</small>
              </div>

                <label for="text-entry">Enter List description:</label>
                <textarea id="text-entry" name="list-description" placeholder="Enter Description" rows="4"></textarea>
                   

            </div>
            <Link to="/soonPage">
              <button type="submit">Make list</button>
              </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default makeList;