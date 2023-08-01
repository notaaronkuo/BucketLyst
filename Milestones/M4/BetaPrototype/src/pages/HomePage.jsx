import React, { useState } from 'react'

import "./css/MainPages.css";

import { Link } from 'react-router-dom';
/*import { Amplify, Auth } from 'aws-amplify';*/

function HomePage() {
/*
  const assessLoggedInState = () => {
    Auth.currentAuthenticatedUser()
        .then(sess => {
            console.log('logged in');
        })
        .catch(() => {
            console.log('not logged in');
        });
  }
  assessLoggedInState();*/


  return (
      console.log("Homepage")
      
  )
}

export default HomePage;
/*import React, { useState } from 'react'

import "./css/MainPages.css";
import HomeMain from '../components/HomePage/home-main';
import { Link } from 'react-router-dom';
        

const HomePage = ({ navigateTo }) => {
  const handleNavigation = (path) => {
    navigateTo(path);
  };


  return (
    <div class = "holder">
      console.log("Homepage")
      <HomeMain navigateTo={navigateTo} />
    </div>
  )
}

export default HomePage;*/