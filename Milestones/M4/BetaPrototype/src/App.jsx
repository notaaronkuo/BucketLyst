import './App.css';
import  { Amplify, API, Auth } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
//import awsconfig from './aws-exports';


import { useLocation, Navigate, Routes, Route, useNavigate } from 'react-router-dom';


//import React, { useState } from 'react'

import HomePage from './pages/HomePage';
import LocationPage from './pages/LocationPage';
import SoonPage from './pages/soonPage';
import BucketLyst from './BucketLyst';
import Users from './pages/Users';
import YourLists from './pages/YourLists';

import UserPage from './pages/UserPage';



import axios from 'axios';


import CreatedList from './pages/ListPages/CreatedList';
import EditList from './pages/ListPages/EditList';
import MakeList from './pages/ListPages/MakeList';
import ViewList from './pages/MainList';
import SuccessList from './pages/ListPages/SuccessList';
import OwnList from './pages/ListPages/OwnList';

import YourProfile from './pages/YourProfile';
import EditProfile from './pages/EditProfile';
import Settings from './pages/SettingsPage';
import MainList from "./pages/MainList";

import LoginApp from './pages/LoginComponents/normallogin';
import Member from './pages/LoginComponents/membership';
import Reset1 from './pages/LoginComponents/reset1';
import Reset2 from './pages/LoginComponents/reset2';

import ListDiscoverPage from './pages/ListDisplays/ListDiscoverPage';
import ListSavedPage from './pages/ListDisplays/ListSavedPage';
import ListFollowingPage from './pages/ListDisplays/ListFollowingPage';

import BMembership from './pages/LoginComponents/businessMembership';
import BLogin from './pages/LoginComponents/businesslogin';

import TermsService from './pages/LoginComponents/termsService';

import EachList from './pages/EachList';

import Landing from './components/landing-page';
import AlertPage from './pages/AlertPage';

import Footer from './components/Bars/footer';

import Overlay from "./components/overlay";
import awsconfig from './aws-exports.js';

// todo: change api
const myAPI = "api1dc1e643"
const path = '/search';
Amplify.configure(awsconfig);
API.configure(awsconfig);
//Main Function

  
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track login state
  
 

  // Checks if user is logged in
  useEffect(() => {
    //For frontend testing purposes, this is set to true, 
    //backend can later implement the changing of this usestate
    assessLoggedInState();
    //setIsLoggedIn(true);
  }, []);

  
  const assessLoggedInState = () => {
    Auth.currentAuthenticatedUser()
        .then(sess => {
            console.log('set logged in');
            setIsLoggedIn(true);
        })
        .catch(() => {
            console.log('set not logged in');
            setIsLoggedIn(false);
        });
};



  const location = useLocation();

const LoggedInPaths = ['/home', '/location', '/soonPage', '/users', '/yourlist', '/userpage', '/yourprofile', '/editprofile', '/settings', '/eachlist', '/tasks', '/createdlist', '/editlist', '/makelist', '/viewlist', '/successlist', '/ownlist', '/listdiscover', '/listsaved', '/listfollow', '/tempfooter', '/implementlater'];

const navigate = useNavigate();
const navigateTo = (path) => {
  if (!isLoggedIn && LoggedInPaths.includes(path)) {
    navigate('/');
    console.log(isLoggedIn);
  } else {
    navigate(path);
  }
};
useEffect(() => {
  if (!isLoggedIn && LoggedInPaths.includes(location.pathname) && location.pathname !== '/') {
    navigate('/');
  } 
}, [isLoggedIn, location, navigate]);
  return (

      <div className="App">
      <Overlay />
      {isLoggedIn && <BucketLyst setIsLoggedIn={setIsLoggedIn}/>}



          {/*<Route path="/" element={<Landing/>} />*/}
          <Routes>

            <Route path="/" element={<Landing />} />
            <Route path="/landing" element={<Landing />} />

            <Route
            path="/login1"
            element ={<LoginApp setIsLoggedIn={setIsLoggedIn} />}
          />

            <Route path="/member" element={<Member />} />
            <Route path="/reset1" element={<Reset1 />} />
            <Route path="/reset2" element={<Reset2 />} />
            <Route path="/blogin" element={<BLogin />} />
            <Route path="/bmembership" element={<BMembership />} />
            <Route path="/terms" element={<TermsService />} />
                      

            <Route path="/home" element={<HomePage navigateTo={navigateTo} />} />
            <Route path="/location" element={<LocationPage navigateTo={navigateTo} />} />
            <Route path="/soonPage" element={<SoonPage navigateTo={navigateTo} />} />
            <Route path="/users" element={<Users navigateTo={navigateTo} />} />
            <Route path="/yourlist" element={<YourLists navigateTo={navigateTo} />} />
            <Route path="/userpage" element={<UserPage navigateTo={navigateTo} />} />
            <Route path="/yourprofile" element={<YourProfile navigateTo={navigateTo} />} />
            <Route path="/editprofile" element={<EditProfile navigateTo={navigateTo} />} />
            <Route path="/settings" element={<Settings navigateTo={navigateTo} />} />
            <Route path="/eachlist" element={<EachList navigateTo={navigateTo} />} />
            <Route path="/tasks" element={<MainList navigateTo={navigateTo} />} />
            <Route path="/createdlist" element={<CreatedList navigateTo={navigateTo} />} />
            <Route path="/editlist" element={<EditList navigateTo={navigateTo} />} />
            <Route path="/makelist" element={<MakeList navigateTo={navigateTo} />} />
            <Route path="/viewlist" element={<ViewList navigateTo={navigateTo} />} />
            <Route path="/successlist" element={<SuccessList navigateTo={navigateTo} />} />
            <Route path="/ownlist" element={<OwnList navigateTo={navigateTo} />} />
            <Route path="/listdiscover" element={<ListDiscoverPage navigateTo={navigateTo} />} />
            <Route path="/listsaved" element={<ListSavedPage navigateTo={navigateTo} />} />
            <Route path="/listfollow" element={<ListFollowingPage navigateTo={navigateTo} />} />
            <Route path="/tempfooter" element={<Footer navigateTo={navigateTo} />} />
            <Route path="/implementlater" element={<AlertPage navigateTo={navigateTo} />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

      </div>
     
  );
}

export default App;

