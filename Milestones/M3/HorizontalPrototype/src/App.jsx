import './App.css';
//import  { Amplify, API } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
//import awsconfig from './aws-exports';
import { useLocation } from 'react-router-dom';



//import React, { useState } from 'react'

import HomePage from './pages/HomePage';
import SoonPage from './pages/soonPage';
import BucketLyst from './BucketLyst';
import Users from './pages/Users';
import YourLists from './pages/YourLists';

import UserPage from './pages/UserPage';


import { BrowserRouter as Router, Routes, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import CreatedList from './pages/ListPages/CreatedList';
import EditList from './pages/ListPages/EditList';
import MakeList from './pages/ListPages/MakeList';
import ViewList from './pages/ListPages/ViewList';
import SuccessList from './pages/ListPages/SuccessList';
import OwnList from './pages/ListPages/OwnList';

import YourProfile from './pages/YourProfile';
import EditProfile from './pages/EditProfile';
import Settings from './pages/SettingsPage';

import Login1 from './pages/LoginComponents/normallogin';
import Member from './pages/LoginComponents/membership';
import Reset1 from './pages/LoginComponents/reset1';
import Reset2 from './pages/LoginComponents/reset2';

import ListDiscoverPage from './pages/ListDisplays/ListDiscoverPage';
import ListSavedPage from './pages/ListDisplays/ListSavedPage';
import ListFollowingPage from './pages/ListDisplays/ListFollowingPage';

import BMembership from './pages/LoginComponents/businessMembership';
import BLogin from './pages/LoginComponents/businesslogin';

import Landing from './components/landing-page';
import AlertPage from './pages/AlertPage';

import Footer from './components/footer';

import Overlay from "./components/overlay";

// todo: change api
const myAPI = "api1dc1e643"
const path = '/search';
//Amplify.configure(awsconfig);
//API.configure(awsconfig);
//Main Function

function App() {



  const [myMessage, setMyMessage] = useState('')
  //const location = useLocation();

  const loadData = async () => {
    const response = await axios.get("http://localhost:3000/search");
    setMyMessage(response.myMessage);
  }
  //const location = useLocation();

  useEffect(() => {
    loadData()
  },[])



  return (
    <Router>
      <div className="App">
      <Overlay />
       { <BucketLyst/>}

        <Routes>

          <Route path="/" element={<Landing/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path = "/soonPage" element = {<SoonPage/>} />
          <Route path = "/users" element={<Users/>}/>
          <Route path = "/yourlist" element={<YourLists/>}/>
          <Route path = "/userpage" element={<UserPage/>}/>
          <Route path = "/yourprofile" element={<YourProfile/>}/>
          <Route path = "/editprofile" element={<EditProfile/>}/>
          <Route path = "/settings" element={<Settings/>}/>

          <Route path = "/login1" element={<Login1/>}/>
          <Route path = "/member" element={<Member/>}/>
          <Route path = "/reset1" element={<Reset1/>}/>
          <Route path = "/reset2" element={<Reset2/>}/>

          <Route path = "/blogin" element={<BLogin/>}/>
          <Route path = "/bmembership" element={<BMembership/>}/>

          <Route path = "/landing" element={<Landing/>}/>

          <Route path = "/createdlist" element={<CreatedList/>}/>
          <Route path = "/editlist" element={<EditList/>}/>
          <Route path = "/makelist" element={<MakeList/>}/>
          <Route path = "/viewlist" element={<ViewList/>}/>
          <Route path = "/successlist" element={<SuccessList/>}/>
          <Route path = "/ownlist" element={<OwnList/>}/>

          <Route path = "/listdiscover" element={<ListDiscoverPage/>}/>
          <Route path = "/listsaved" element={<ListSavedPage/>}/>
          <Route path = "/listfollow" element={<ListFollowingPage/>}/>

          <Route path = "/tempfooter" element={<Footer/>}/>
          <Route path = "/implementlater" element={<AlertPage/>}/>

        </Routes>



      </div>
    </Router>
  );
}

export default App;

