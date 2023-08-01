import React, { useState } from 'react';
import { Link } from "react-router-dom";

function YourProfile() {
  console.log("On it");

  return (

    <div class="main-container">

          Your Profile Page
 
          <Link to = "/editprofile"><button class="edit-btn">Edit Profile</button></Link>
         
    </div>
  );
}

export default YourProfile;